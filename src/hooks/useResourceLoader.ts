'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LoadingState, LoadingProgress, ResourceLoaderOptions, ResourceState } from '@/lib/loading/types';

interface UseResourceLoaderParams<T> {
  loaderFn: (signal: AbortSignal) => Promise<T>;
  dependencies?: unknown[];
  options?: ResourceLoaderOptions;
  isEmptyFn?: (data: T) => boolean;
  autoStart?: boolean;
}

export function useResourceLoader<T = unknown>({
  loaderFn,
  dependencies = [],
  options = {},
  isEmptyFn,
  autoStart = true,
}: UseResourceLoaderParams<T>): ResourceState<T> {
  const {
    flickerThresholdMs = 180,
    slowThresholdMs = 3000,
    timeoutMs = 15000,
  } = options;

  const [state, setState] = useState<LoadingState>('initial-reveal');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | string | null>(null);
  const [isSlow, setIsSlow] = useState(false);
  const [progress, setProgress] = useState<LoadingProgress>({
    total: 1,
    completed: 0,
    ratio: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const flickerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  const cleanupTimers = useCallback(() => {
    if (flickerTimerRef.current) clearTimeout(flickerTimerRef.current);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
  }, []);

  const executeLoad = useCallback(async () => {
    // Cancel any ongoing task safely
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    cleanupTimers();
    setIsSlow(false);
    setError(null);

    // Initial Reveal state trigger
    setState('initial-reveal');

    // Anti-flicker delay before showing content-loading UI
    flickerTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !controller.signal.aborted) {
        setState((current) => (current === 'initial-reveal' ? 'content-loading' : current));
      }
    }, flickerThresholdMs);

    // Slow loading timer
    slowTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !controller.signal.aborted) {
        setIsSlow(true);
        setState((current) => {
          if (current === 'content-loading' || current === 'initial-reveal') {
            return 'slow-loading';
          }
          return current;
        });
      }
    }, slowThresholdMs);

    // Safety timeout
    timeoutTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !controller.signal.aborted) {
        controller.abort();
        setError('The operation exceeded the expected time limit.');
        setState('error');
      }
    }, timeoutMs);

    try {
      const result = await loaderFn(controller.signal);

      if (!isMountedRef.current || controller.signal.aborted) return;
      cleanupTimers();

      setData(result);
      setProgress({ total: 1, completed: 1, ratio: 1 });

      // Determine if result is empty
      const isResultEmpty = isEmptyFn
        ? isEmptyFn(result)
        : Array.isArray(result)
        ? result.length === 0
        : result === null || result === undefined;

      if (isResultEmpty) {
        setState('empty');
      } else {
        setState('ready');
      }
    } catch (err: unknown) {
      if (!isMountedRef.current || controller.signal.aborted) return;
      cleanupTimers();

      const errMsg = err instanceof Error ? err.message : 'A network error occurred.';
      // Don't flag intentional aborts as errors
      if (err instanceof DOMException && err.name === 'AbortError') return;

      setError(errMsg);
      setState('error');
    }
  }, [loaderFn, flickerThresholdMs, slowThresholdMs, timeoutMs, isEmptyFn, cleanupTimers]);

  const retry = useCallback(() => {
    retryCountRef.current += 1;
    executeLoad();
  }, [executeLoad]);

  const reset = useCallback(() => {
    cleanupTimers();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState('initial-reveal');
    setData(null);
    setError(null);
    setIsSlow(false);
    setProgress({ total: 1, completed: 0, ratio: null });
  }, [cleanupTimers]);

  useEffect(() => {
    isMountedRef.current = true;
    if (autoStart) {
      executeLoad();
    }
    return () => {
      isMountedRef.current = false;
      cleanupTimers();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [...dependencies, autoStart]);

  return {
    state,
    data,
    error,
    progress,
    isSlow,
    canRetry: state === 'error',
    retry,
    reset,
  };
}
