export function env(key: string): any {
    return import.meta.env[key]
}