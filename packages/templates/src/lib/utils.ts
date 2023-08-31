export const _debounce = function <T extends (...args: unknown[]) => void>(
    callback: T,
    debounceDelay: number = 300,
    immediate: boolean = false
) {
    let timeout: ReturnType<typeof setTimeout> | null;

    return function <U>(this: U, ...args: Parameters<typeof callback>) {
        console.log('BBB');

        if (immediate && !timeout) {
            callback.apply(this, args)
        }
        if (typeof timeout === "number") {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                callback.apply(this, args)
            }
        }, debounceDelay);
    }
}