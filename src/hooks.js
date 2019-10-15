import { useEffect, useRef, useState } from 'react';

/**
 * Accepts a function that creates a timeout. If the function returns a
 * setTimeout id, the timeout is cancelled if the function is called again.
 */
export function useReplaceableTimeout(callback) {
    const timeoutIdRef = useRef(null);
    useEffect(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        const timeoutId = callback();
        timeoutIdRef.current = timeoutId;
    });
}

/**
 * Accepts a function that shouldn't be called again until it has signaled that
 * it is complete, by calling its argument.
 *
 * Returns a function that guards the callback, and a value that indicates
 * whether the function is currently running.
*/
export function useMutexProtection(callback) {
    const [isRunning, setIsRunning] = useState(false);
    function guardedCallback() {
        if (isRunning) { return; }
        setIsRunning(true);
        callback(() => setIsRunning(false));
    }
    return [guardedCallback, isRunning];
}
