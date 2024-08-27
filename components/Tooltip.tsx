import { injectScript, injectStyle } from "@wukong/utilities/dom"
import type { ComponentChildren } from "preact"
import { useEffect, useRef } from "preact/hooks"

export async function injectTippyScripts() {
    await injectStyle('https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.min.css')
    await injectScript('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js')
    await injectScript('https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.umd.min.js')
}

export default function TooltipButton({children, tooltip, className, onClick}: {
    children: ComponentChildren, 
    tooltip: string, 
    className?: string,
    onClick?: Function,
}) {
    const ref = useRef(null)
    const instanceRef = useRef(null)
    useEffect(() => {
        injectTippyScripts().then(() => {
            instanceRef.current = window['tippy'](ref.current, {content: tooltip})
        })
        return () => {
            console.log(instanceRef.current)
            if (instanceRef.current) {
                instanceRef.current.destroy()
                instanceRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current.setContent(tooltip)
        }
    }, [tooltip])
    
    return <button className={className} ref={ref} onClick={onClick as any}>
        {children}
    </button>
}