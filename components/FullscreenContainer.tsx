import type { ComponentChildren } from "preact"

export function FullscreenContainer({fullscreen, children}: {
    fullscreen: boolean,
    children: ComponentChildren
}) {
    return <div className={(fullscreen? 'fixed left-0 top-0 w-full h-full z-10': 'border border-gray-200 rounded') + ' flex flex-col'}>
        {children}
    </div>
}
