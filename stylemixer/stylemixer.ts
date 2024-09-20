export type StyleMixer<T extends {[key: string]: string}> = (styles: T) => Partial<T> 

export function applyStyleMixer<T extends {[key: string]: string}>(style: T, mixer: StyleMixer<T>): T {
    return mixer == null ? style: {...style, ...mixer(style)}
}