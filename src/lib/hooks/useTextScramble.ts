'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export function useTextScramble(initialText: string) {
  const [text, setText] = useState(initialText);
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const resolveRef = useRef<(value: void | PromiseLike<void>) => void>(() => {});

  const update = useCallback((time: number) => {
    let complete = true;
    let output = '';

    for (let i = 0, n = queueRef.current.length; i < n; i++) {
      let { from, to, start, end, char } = queueRef.current[i];
      if (frameRef.current >= end) {
        complete = complete && true;
        output += to;
      } else if (frameRef.current >= start) {
        complete = false;
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queueRef.current[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        complete = false;
        output += from;
      }
    }

    setText(output);

    if (complete) {
      resolveRef.current();
    } else {
      frameRef.current++;
      requestAnimationFrame(update);
    }
  }, []);

  const scramble = useCallback((newText: string) => {
    const oldText = text.replace(/<[^>]*>?/gm, '');
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => {
      resolveRef.current = resolve;
    });

    queueRef.current = [];
    for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queueRef.current.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    update(0);
    return promise;
  }, [text, update]);

  return { text, scramble };
}
