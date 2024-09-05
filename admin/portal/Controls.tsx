import type { ComponentChildren } from "preact"
import { Link } from "wouter-preact"
import { clz } from '../../utilities/clx';


export function IconLink({href, children, onClick, className=''}: {
    href: string,
    children: ComponentChildren,
    onClick?: () => any,
    className?: string
}) {
    return <Link href={href} className={clz(`text-blue-500 hover:text-blue-700`, className)} onClick={onClick}>
        {children}
    </Link>
}
