
export function arraReducer<TData, TMapped>(
    inital: TMapped[],
    mapper: (acc: TMapped[], curr: TData) => TMapped,
    data: TData[],
) {
    return data.reduce((acc: TMapped[], curr: TData) => {
        const mapped = mapper(acc, curr);
        return [
            ...acc,
            mapped
        ];
    }, inital);
}

export function mapReducer<TMapped, TData extends {} = {}>(
    inital: TMapped,
    mapper: (acc: TMapped, curr?: TData) => TMapped,
    data: TData[] = [],
) {
    return data.reduce((acc: TMapped, curr?: TData) => {
        const mapped = mapper(acc, curr);
        return mapped;
    }, inital);
}

