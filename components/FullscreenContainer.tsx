import type { ComponentChildren } from "preact"
import { clz } from '../utilities/clx';

export function FullscreenContainer({fullscreen, children, className}: {
    fullscreen: boolean,
    className?: string,
    children: ComponentChildren
}) {
    return <div className={clz(fullscreen? 'fixed left-0 top-0 w-full h-full z-10': 'border border-gray-200 rounded', `flex flex-col`, className)}>
        {children}
    </div>
}
