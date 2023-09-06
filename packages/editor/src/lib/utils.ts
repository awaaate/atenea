export const _debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};


export function dataAdapter<TData, TMapped>(
    data: TData[],
    mapper: (data: TData) => TMapped,
    inital: TMapped
) {
    return data.reduce((acc, curr: TData) => {
        const mapped = mapper(curr);
        return {
            ...acc,
            ...mapped,
        };
    }, inital);
}
