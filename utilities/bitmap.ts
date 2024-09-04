export default class Bitmap {
    _v = [0, 0]
    set(radix: number) {
        const [arrIdx, bitIdx] = [radix >> 5, radix & 63]
        this._v[arrIdx] |= (1<< bitIdx)
    }
    check(radix: number): boolean {
        const [arrIdx, bitIdx] = [radix >> 5, radix & 63]
        return (this._v[arrIdx] & (1 << bitIdx)) != 0
    }
}
