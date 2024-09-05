import type { ComponentChildren } from "preact"
import { clz } from '../utilities/clx';

export const defaultInputClasses = `py-1.5 px-2 border border-gray-300 rounded peer outline-none min-w-24`

export function Input({value, className, onChange, readOnly=false, type="text"}: {
    value: string,
    className?: string,
    readOnly?: boolean,
    type?: 'text'|'number',
    onChange?: (newValue: string) => any,
}) {
    return <input type={type}
        readOnly={readOnly}
        className={clz(defaultInputClasses, className)}
        value={value}
        onChange={e => onChange&&onChange((e.target as any).value)} />
}

export function Textarea({value, className, onChange, readOnly=false}: {
    value: string,
    className?: string,
    readOnly?: boolean,
    onChange?: (newValue: string) => any,
}) {
    return <textarea
        className={clz(defaultInputClasses, 'w-full', className)}
        value={value}
        onChange={e => onChange((e.target as any).value)}>
    </textarea>
}

export function Select({value, options, className='', onChange}: {
    value: number|string,
    options: {value, text}[],
    className?: string,
    onChange: (newValue: string) => any,
}) {
    return <select
        value={value}
        onChange={e => onChange((e.target as any).value)}
        className={clz(defaultInputClasses, className)}
    >
        {options.map(({value, text}) => <option value={value}>{text}</option>)}
    </select>
}

export function FloatLabel({label, value, size='base', className, labelClassName, children, fixed=false}: {
    label: string,
    value: string,
    size?: 'small'|'base'|'large',
    className?: ClassValue[],
    labelClassName?: ClassValue[]
    fixed?: boolean
    children: ComponentChildren,
}) {
    const disableFloating = fixed || value.length > 0
    const labelClass = clz('absolute left-1.5 px-0.5 bg-white transition-all text-gray-400',
        (disableFloating ? 'text-sm -top-3': 'pointer-events-none top-[0.3em] peer-focus:pointer-events-auto peer-focus:text-sm peer-focus:-top-3 peer-active:pointer-events-auto peer-active:text-sm peer-active:-top-3'),
        labelClassName,
    );
    return <div className={clz('relative', className)}>
        {children}
        <label className={labelClass}>{label}</label>
    </div>
}


export function LabeledInput({label, value, onChange, className='', labelClassName='', inputClassName='', readOnly=false}: {
    label: string,
    value: string,
    onChange: (newValue: string) => any,
    className?: string,
    labelClassName?: string
    inputClassName?: string,
    readOnly?: boolean,
}) {
    return <FloatLabel label={label} value={value} className={className} fixed={readOnly} labelClassName={labelClassName}>
        <Input value={value} onChange={onChange} className="w-full" readOnly={readOnly}/>
    </FloatLabel>
}
