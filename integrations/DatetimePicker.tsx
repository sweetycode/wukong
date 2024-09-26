import { injectScript, injectStyle } from "../utilities/dom"
import { useEffect, useRef } from "preact/hooks"
import { defaultInputClasses } from "../components/Input";
import { clz } from "../utilities/clx";


export async function injectDatetimePickerScripts() {
    await injectStyle('https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css')
    return await injectScript('https://cdn.jsdelivr.net/npm/flatpickr')
}


export default function DateTimePicker({value, onChange}: {
    value: string,
    onChange: (newValue: string) => void,
}) {
    const ref = useRef(null)
    const instance = useRef(null)
    useEffect(() => {
        injectDatetimePickerScripts().then(() => {
            instance.current = window['flatpickr'](ref.current, {
                enableTime: true,
                dateFormat: 'Y-m-d H:i:S',
                enableSeconds: true,
            })
            instance.current.setDate(value, false, '')
        })

        return () => {
            if (instance.current != null) {
                instance.current.destroy()
                instance.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (instance.current) {
            instance.current.setDate(value, false, '')
        }
    }, [value])

    return <input ref={ref} type='text' className={clz(defaultInputClasses, `focus:ring-blue-600 focus:border-blue-600`)} onChange={e => onChange((e.target as any).value)}/>
}
