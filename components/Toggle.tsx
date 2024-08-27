import type { ComponentChildren } from "preact";

export function Toggle({value, onChange, children}: {value: boolean, onChange:(value: boolean) => void, children: ComponentChildren}) {
    return <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" checked={value} onChange={e => onChange&&onChange((e.target as any).checked)}/>
        <div class="relative w-7 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
        <span class="ms-1 text-gray-900">{children}</span>
    </label>
}