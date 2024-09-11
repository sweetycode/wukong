import _ from "./dash"


export function injectScript(src: string, onLoad?: Function): Promise<any> {
    return _.once(`dynscript-${src}`, () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                const result = onLoad && onLoad()
                resolve(result)
            }
            script.onerror = reject
            document.head.appendChild(script)
        })
    })
}

export function injectStyle(src: string): Promise<any> {
    return _.once(`dynstyle-${src}`, () => {
        return new Promise((resolve, reject) => {
            if (src.startsWith('/static') || src.startsWith('https://') || src.startsWith('://')) {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = src
                link.onerror = reject
                link.onload = resolve
                document.head.appendChild(link)
            } else {
                const style = document.createElement('style')
                style.textContent = src
                document.head.appendChild(style)
                resolve(undefined)
            }
        })
    });
}

const _escListeners: (()=>any)[] = []

export function addEscKeyListener(listener: () => any) {
    _escListeners.push(listener)

    _.once('esc-register', () => {
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                let listener = _escListeners.pop()
                if (listener) {
                    listener()
                }
            }
        })
    })
}
