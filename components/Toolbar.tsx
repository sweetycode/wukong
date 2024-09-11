import { IconExitFullscreen, IconFullscreen, IconNoWrap, IconWrap } from "@wukong/icons/IconImages"
import type { ComponentChild } from "preact"
import TooltipButton from "./Tooltip"

export type ToolbarItem = {
    icon: ComponentChild,
    tooltip: string,
    onClick?: () => void,
    hidden?: boolean
} | (() => ComponentChild) | 'gutter'


export default function Toolbar({items}: {items: ToolbarItem[]}) {
    return <div className="bg-stone-100 flex text-sm">
        {items.map(item => {
            if (item instanceof Function) {
                return item()
            }
            if (item === 'gutter') {
                return <div className="grow"/>
            }
            if (item.hidden) return null;
            return <TooltipButton className="py-1.5 px-2 hover:bg-stone-200" tooltip={item.tooltip} onClick={item.onClick}>{item.icon}</TooltipButton>
        })}
    </div>
}



export function toolbarItemFullscreen({fullscreen, toggleFullscreen}) {
    return {
        tooltip: fullscreen? 'Exit fullscreen': 'Fullscreen',
        icon: fullscreen? <IconExitFullscreen size="24"/>:<IconFullscreen size="24"/>,
        onClick: toggleFullscreen,
    }
}

export function toolbarItemWrap({wrap, toggleWrap}: {
    wrap: boolean,
    toggleWrap: () => void
}) {
    return {
        tooltip: wrap? 'Nowrap': 'Wrap',
        icon: wrap? <IconNoWrap size="24"/> : <IconWrap size="24"/>,
        onClick: toggleWrap,
    }
}