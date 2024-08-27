import type { ComponentChildren } from "preact"

export function CheckBox({value, onChange, children, className, size='base'}: {
    value: boolean,
    onChange: (checked: boolean) => void,
    children: ComponentChildren,
    className?: string,
    size?: 'small'|'base'|'large',
}) {
    const boxSize = size == 'small' ? 'h-3 w-3': (size == 'base'? 'h-4 w-4': 'h-5 w-5')
    return <label class={`inline-flex items-center text-gray-900 ${className}`}>
        <input
            checked={value}
            onChange={e => onChange((e.target as any).checked)}
            type="checkbox"
            className={`${boxSize} text-blue-600 bg-gray-100 border-gray-300 rounded me-1`}/>
        {children}
    </label>
}