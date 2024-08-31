import { injectScript, injectStyle } from "@wukong/utilities/dom"
import { useEffect, useRef } from "preact/hooks"


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

    return <input ref={ref} type='text' className="px-2 py-1 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block" onChange={e => onChange((e.target as any).value)}/>
}
