import { b65Decode, b65Encode } from "./base65"

export function string2Uint8Array(str: string): Uint8Array {
    return new TextEncoder().encode(str)
}

export function string2ArrayBuffer(str: string): Uint8Array {
    return string2Uint8Array(str)
}

export function arrayBuffer2String(buffer: ArrayBuffer): string {
    return new TextDecoder().decode(buffer);
}

export async function compress(plain: string): Promise<string> {
    const stream = new CompressionStream('deflate-raw') // 'deflate'|'gzip'|'deflate-raw'
    const writer = stream.writable.getWriter()
    writer.write(string2ArrayBuffer(plain))
    writer.close()
    const buffer = await new Response(stream.readable).arrayBuffer()
    return b65Encode(buffer)
}

export async function decompress(base64: string): Promise<string> {
    const decoded = b65Decode(base64)
    const stream = new DecompressionStream('deflate-raw')
    const writer = stream.writable.getWriter()
    writer.write(decoded)
    writer.close()
    const buffer = await new Response(stream.readable).arrayBuffer()
    return arrayBuffer2String(buffer)
}