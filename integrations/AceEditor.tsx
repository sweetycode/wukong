import _ from "@wukong/utilities/dash"
import { useEffect, useRef } from "preact/hooks"
import { injectScript, injectStyle } from "@wukong/utilities/dom"

export async function injectAceScripts() {
    injectStyle('https://cdn.jsdelivr.net/npm/ace-builds@1.35.2/css/ace.min.css')
    return injectScript('https://cdn.jsdelivr.net/npm/ace-builds@1.35.2/src-min-noconflict/ace.js')
}


export default function AceEditor({value='', lang='text', onChange, debounce=700, className, wrap=false}: {
    value?: string,
    lang: 'text'|'json'|'markdown'|'html'|'csv'|'javascript'|'sql',
    onChange: (value: string) => any,
    debounce?: number,
    className?: string,
    wrap?: boolean,
}) {
    const containerRef = useRef(null)
    const editorRef = useRef(null)
    const lastValueRef = useRef(null)

    useEffect(() => {
        injectAceScripts().then(() => {
            const elemId = `editor-${_.incrementalGet()}`
            containerRef.current.id = elemId
            containerRef.current.style.fontSize = '18px'
            editorRef.current = window['ace'].edit(elemId, {})
            editorRef.current.setTheme("ace/theme/textmate");
            if (onChange) {
                editorRef.current.session.on('change', _.debounce(() => {
                    const newValue = editorRef.current.getValue()
                    if (newValue != lastValueRef.current) {
                        onChange(lastValueRef.current = newValue)
                    }
                }, debounce))
            }
        })

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy()
                editorRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (editorRef.current && value != lastValueRef.current) {
            lastValueRef.current = value
            editorRef.current.setValue(value)
        }
    }, [value])

    useEffect(() => {
        editorRef.current && editorRef.current.session.setUseWrapMode(wrap);
    }, [wrap])

    useEffect(() => {
        editorRef.current && editorRef.current.session.setMode(`ace/mode/${lang}`)
    }, [lang])

    return <div ref={containerRef} className={`${className}`}></div>
}
