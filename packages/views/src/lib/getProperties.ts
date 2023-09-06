
export function getProperty<TObject extends Record<string, any>>(obj: TObject, propertyPath: string): unknown {
    const properties = propertyPath.split('.');
    let value = obj;
    for (const property of properties) {
        value = value[property];
        if (value === undefined) {
            break;
        }
    }
    return value;
}

/* export function setProperty(
    obj: Record<string, any>,
    propertyPath: string,
    value: unknown,
) {
    const properties = propertyPath.split('.');
    let currentObj = obj;
    for (const property of properties.slice(0, -1)) {
        if (currentObj[property] === undefined) {
            currentObj[property] = {};
        }
        currentObj = currentObj[property];
    }
    currentObj[

        [properties.length - 1]] = value;
} */
