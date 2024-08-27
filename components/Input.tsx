import type { ComponentChildren } from "preact"

export function Input({value, className, onChange}: {
    value: string,
    className?: string,
    onChange: (newValue: string) => any,
}) {
    return <input type="text" className={`border border-gray-300 px-1 py-0.5 rounded peer outline-none focus:border-blue-400 ${className}`} value={value} onChange={e => onChange((e.target as any).value)}/>
}


export function FloatLabel({label, value, size='base', className, children}: {
    label: string,
    value: string,
    size?: 'small'|'base'|'large',
    className?: string,
    children: ComponentChildren,
}) {
    return <div className={`relative ${className}`}>
        {children}
        <label
            className={`absolute left-1.5 px-0.5 bg-white transition-all ${value.length == 0 ? 'top-0.5 text-gray-700': 'text-gray-500 text-xs -top-2'} peer-focus:text-gray-500 peer-focus:text-xs peer-focus:-top-2 peer-active:text-gray-500 peer-active:text-xs peer-active:-top-2`}
        >{label}</label>
    </div>
}


export function LabeledInput({label, value, onChange, className}: {
    label: string,
    value: string,
    onChange: (newValue: string) => any,
    className?: string
}) {
    return <FloatLabel label={label} value={value} className={className}>
        <Input value={value} onChange={onChange} className="w-full"/>
    </FloatLabel>
}