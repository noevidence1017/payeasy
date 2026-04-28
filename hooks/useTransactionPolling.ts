import { useEffect, useRef, useState } from "react";

export interface HasTxHash {
  txHash: string;
}

export function getNewTransactionsByHash<T extends HasTxHash>(
  currentTransactions: T[],
  incomingTransactions: T[]
): T[] {
  const knownHashes = new Set(currentTransactions.map((tx) => tx.txHash));
  return incomingTransactions.filter((tx) => !knownHashes.has(tx.txHash));
}

export async function pollForNewTransactions<T extends HasTxHash>(
  currentTransactions: T[],
  fetchLatest: () => Promise<T[]>
): Promise<{ merged: T[]; newTransactions: T[] }> {
  const incoming = await fetchLatest();
  const newTransactions = getNewTransactionsByHash(currentTransactions, incoming);

  if (newTransactions.length === 0) {
    return { merged: currentTransactions, newTransactions };
  }

  return {
    merged: [...newTransactions, ...currentTransactions],
    newTransactions,
  };
}

export interface UseTransactionPollingOptions<T extends HasTxHash> {
  enabled: boolean;
  currentTransactions: T[];
  fetchLatest: () => Promise<T[]>;
  onNewTransactions: (transactions: T[]) => void;
  intervalMs?: number;
}

export default function useTransactionPolling<T extends HasTxHash>({
  enabled,
  currentTransactions,
  fetchLatest,
  onNewTransactions,
  intervalMs = 15_000,
}: UseTransactionPollingOptions<T>): void {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const tick = async () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      const { newTransactions } = await pollForNewTransactions(currentTransactions, fetchLatest);
      if (!cancelled && newTransactions.length > 0) onNewTransactions(newTransactions);
    };

    const interval = window.setInterval(() => { void tick(); }, intervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [enabled, currentTransactions, fetchLatest, onNewTransactions, intervalMs]);
}

// ─── Horizon SSE stream ────────────────────────────────────────────────────────

const HORIZON_TESTNET = "https://horizon-testnet.stellar.org";

export interface UseHorizonStreamOptions {
  /** Stellar account ID to stream transactions for. Pass null to disable. */
  accountId: string | null;
  horizonUrl?: string;
  /** Called whenever Horizon pushes a new transaction event. */
  onNewTransaction: () => void;
}

/**
 * Opens a Horizon Server-Sent Events stream for the given account on mount
 * and closes it on unmount. Calls `onNewTransaction` each time a new
 * transaction event arrives without triggering unnecessary re-subscriptions.
 */
export function useHorizonStream({
  accountId,
  horizonUrl = HORIZON_TESTNET,
  onNewTransaction,
}: UseHorizonStreamOptions): { isStreaming: boolean } {
  const [isStreaming, setIsStreaming] = useState(false);
  const callbackRef = useRef(onNewTransaction);

  // Keep ref current without reopening the stream on every render.
  useEffect(() => {
    callbackRef.current = onNewTransaction;
  });

  useEffect(() => {
    if (!accountId) {
      setIsStreaming(false);
      return;
    }

    const url = `${horizonUrl}/accounts/${encodeURIComponent(accountId)}/transactions?cursor=now`;
    const es = new EventSource(url);

    es.onopen = () => setIsStreaming(true);
    es.onmessage = () => void callbackRef.current();
    es.onerror = () => setIsStreaming(false);

    return () => {
      es.close();
      setIsStreaming(false);
    };
  }, [accountId, horizonUrl]);

  return { isStreaming };
}
