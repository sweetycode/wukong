import Bitmap from "./bitmap"

export type ClassValue = ClassArray|string|undefined|null
type ClassArray = ClassValue[]


export function clx(...classes: ClassValue[]): string {
    return classes
        .flat()
        .filter(s => typeof s === 'string' && s.length > 0).join(' ')
}

export function clz(...classes: ClassValue[]): string {
    return dedup(clx(classes))
}

const _cache1 = new Map<string, string>()
function dedup(className: string): string {
    let res = _cache1.get(className)
    if (res == null) {
        res = _dedup(className)
        _cache1.set(className, res)
    }
    return res
}

function _dedup(className: string): string {
    const bm = new PseudoBitmap()
    const res: string[] = []
    className.split(' ').reverse().forEach(clazz => {
        const [pseudo, attrName] = PseudoBitmap.splitPseudo(clazz)
        const radix = mapClassToRadix(attrName)
        if (radix == 0) {  // all unconfigured attributes
            res.push(clazz)
        } else if (!bm.check(pseudo, radix)) {
            res.push(clazz)
            bm.set(pseudo, radix)
        }
    })
    return res.reverse().join(' ')
}


class PseudoBitmap {
    bitmaps = new Map<string, Bitmap>()

    static splitPseudo(clazz: string): [string, string] {
        let index = clazz.lastIndexOf(':')
        if (index > 0) {
            return [clazz.substring(0, index), clazz.substring(index + 1)]
        } else {
            return ['', clazz]
        }
    }

    set(pseudo: string, radix: number) {
        let bm = this.bitmaps.get(pseudo)
        if (bm == null) {
            bm = new Bitmap()
            this.bitmaps.set(pseudo, bm)
        }
        bm.set(radix)
    }

    check(pseudo: string, radix: number): boolean {
        let bm = this.bitmaps.get(pseudo)
        return bm != null ? bm.check(radix): false
    }
}

const _cache0 = new Map<string, number>()
function mapClassToRadix(clazz: string): number {
    let radix = _cache0.get(clazz)
    if (radix === undefined) {
        radix = _mapClassToRadix(clazz)
        _cache0.set(clazz, radix)
    }
    return radix
}

function _mapClassToRadix(clazz: string): number {
    for (let mapper of _classMappers) {
        if (isMatch(clazz, mapper)) {
            return mapper.radix
        }
    }
    return 0
}

function isMatch(clazz: string, {prefix, check}: ClassMapper): boolean {
    if (prefix instanceof RegExp) {
        const match = clazz.match(prefix)
        if (match == null ) {
            return false
        }
        return check ? check(match, clazz): true
    }
    // else is string
    return clazz.startsWith(prefix)
}

interface ClassMapper {
    radix: number,
    prefix: string|RegExp,
    check?: (match: RegExpMatchArray, s: string) => boolean
}

let CSS_RADIX_COUNTER = 1
const _classMappers: ClassMapper[] = []

function classMapper(prefix: string|RegExp, check?: (match: RegExpMatchArray, s:string) => boolean) {
    _classMappers.push({
        radix: CSS_RADIX_COUNTER++,
        prefix,
        check,
    })
}

const COLORS = new Set(['inherit', 'current', 'transparent', 'black', 'white', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'])
const SIZES = new Set(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'])


// padding,margin
classMapper(/^(?:-)?p-/)
classMapper(/^(?:-)?px-/)
classMapper(/^(?:-)?py-/)
classMapper(/^(?:-)?pt-/)
classMapper(/^(?:-)?pr-/)
classMapper(/^(?:-)?pb-/)
classMapper(/^(?:-)?pl-/)

classMapper(/^(?:-)?m-/)
classMapper(/^(?:-)?mx-/)
classMapper(/^(?:-)?my-/)
classMapper(/^(?:-)?mt-/)
classMapper(/^(?:-)?mr-/)
classMapper(/^(?:-)?mb-/)
classMapper(/^(?:-)?ml-/)



// width,height
classMapper('w-')
classMapper('h-')
classMapper('space-')
classMapper('max-w-')
classMapper('max-h-')
classMapper('min-w-')
classMapper('min-h-')
classMapper('size-')

// rounded
classMapper('rounded')

// border
const BORDER_STYLES = new Set(['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'])
classMapper(/^border(?:-(\d))?$/)
classMapper(/^border-[a-z](?:-\d)?$/)
classMapper(/^border-([a-z]+)$/, match => BORDER_STYLES.has(match[1]))
classMapper(/^border-([a-z]+)/, match => COLORS.has(match[1]))

// bg
classMapper(/^bg-([a-z]+)/, match => COLORS.has(match[1]))


// display
classMapper(/^(?:(?:inline-)?(?:block|flex|table|grid))|inline|flex|table|grid|hidden|list-item|table-cell|table-column$/)
classMapper(/^(?:static|fixed|absolute|relative|sticky)$/)
classMapper('overflow-')

classMapper('leading-')
classMapper('clear-')

// flex, grid
classMapper('basis-')
classMapper(/^flex-(?:row|col)(?:-reverse)?$/)
classMapper(/^flex-(?:wrap|nowrap)(?:-reverse)?$/)
classMapper(/^flex-(?:1|auto|initial|none)$/)
classMapper(/^grow(?:-0)?$/)
classMapper(/^shrink(?:-0)?$/)
classMapper('order-')
classMapper(/^gap-[\d\.]+/)
classMapper(/^gap-[x|y]-/)
classMapper('justify-self-')
classMapper('justify-items-')
classMapper('justify-')
classMapper('items-')
classMapper('self-')
classMapper('place-content-')
classMapper('place-items-')
classMapper('place-self-')

// opacity
classMapper('opacity-')

// text
const WRAP_STYLES = new Set(['wrap', 'nowrap', 'balance', 'pretty'])
const TEXT_ALIGNS = new Set(['left', 'right', 'center', 'justify', 'start', 'end'])
const FONT_FAMILIES = new Set(['sans', 'serif', 'mono'])
const FONT_WEIGHTS = new Set(['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'])
classMapper(/^text-([a-z]+)/, match => COLORS.has(match[1]))
classMapper(/^text-([a-z]+)/, match => SIZES.has(match[1]))
classMapper(/^text-([a-z]+)/, match => WRAP_STYLES.has(match[1]))
classMapper(/^text-([a-z]+)/, match => TEXT_ALIGNS.has(match[1]))
classMapper(/^font-([a-z]+)/, match => FONT_WEIGHTS.has(match[1]))
classMapper(/^font-([a-z]+)/, match => FONT_FAMILIES.has(match[1]))
classMapper('whitespace-')
classMapper('break-')


// shadow
const SHADOW_SIZES = new Set(['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'])
classMapper(/^shadow-([a-z]+)/, match => COLORS.has(match[1]))
classMapper(/^shadow(?:-([a-z]+))?/, match => match[1] === undefined || SHADOW_SIZES.has(match[1]))
classMapper(/^shadow(?:-([a-z]+))?/, match => match[1] === undefined || SHADOW_SIZES.has(match[1]))


// z-index
classMapper('z-')
classMapper(/^start-[\d\.]+$/)
classMapper(/^end-[\d\.]+$/)
classMapper(/^(?:-)?top-[\d\.]+$/)
classMapper(/^(?:-)?right-[\d\.]+$/)
classMapper(/^(?:-)?bottom-[\d\.]+$/)
classMapper(/^(?:-)?left-[\d\.]+$/)
