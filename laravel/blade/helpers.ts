export function bladeVar(name: string, testValue?: string): string {
    if (import.meta.env.DEV && testValue !== undefined) {
        return testValue
    }
    return `{{${name}}}`
}


export function bladeHtmlVar(name: string, testValue?: string): string {
    if (import.meta.env.DEV && testValue !== undefined) {
        return testValue
    }
    return `{!! ${name} !!}`
}
