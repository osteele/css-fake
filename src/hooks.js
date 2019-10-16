import { useEffect, useRef, useState } from 'react';

/**
 * Accepts a function that creates a timeout. If the function returns a
 * setTimeout id, the timeout is cancelled if the function is called again.
 *
 * ```
 * // The old timer is cancelled and a new timer starts each time the
 * // component is rendered.
 * function Component() {
 *   useRestartableTimeoutEffect(() =>
 *     setTimeout(() => console.info('done'), 1000));
 *   ...
 * }
 */
export function useRestartableTimeoutEffect(effect) {
    const timeoutIdRef = useRef(null);
    useEffect(() => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        const timeoutId = effect();
        timeoutIdRef.current = timeoutId;
    });
}

/**
 * Accepts a function that shouldn't be called again until it has signaled that
 * it is complete, by calling its argument.
 *
 * Returns a function that guards the callback, and a value that indicates
 * whether the function is currently running.
 *
 * ```
 * const [scheduleRefresh, isRefreshing] = useMutexGuard((done) => {
 *   fetch('http://example.com/movies.json')
 *     .then((response) => response.json())
 *     .then(setData)
 *     .finally(done);
 * });
 *
 * <i
 *   onClick={scheduleRefresh}
 *   className={`fa fa-refresh ${isRefreshing && 'fa-spin}`}/>
 * ```
*/
export function useMutexGuard(callback) {
    const [isRunning, setIsRunning] = useState(false);
    function guardedCallback() {
        if (isRunning) { return; }
        setIsRunning(true);
        callback(() => setIsRunning(false));
    }
    return [guardedCallback, isRunning];
}
