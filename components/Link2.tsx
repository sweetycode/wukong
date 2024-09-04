import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";


export default function Link2({href, children, className='', onClick, raw=true}: {
    href: string,
    children: ComponentChildren,
    className?: string,
    onClick?: () => any,
    raw?: boolean
}) {
    const Node = useContext(Link2Node)
    return Node == null
        ? <a href={href} className={className} onClick={onClick}>{children}</a>
        : <Node href={href} className={className}>{children}</Node>
}

export const Link2Node = createContext<Function|null>(null)
