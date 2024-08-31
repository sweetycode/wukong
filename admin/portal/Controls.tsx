import { ComponentChildren } from "preact"
import { Link } from "wouter-preact"


export function IconLink({href, children, onClick}: {href: string, children: ComponentChildren, onClick: () => any}) {
    return <Link href={href} className="text-blue-500 hover:text-blue-700 hover:text-white" onClick={onClick}>
        {children}
    </Link>
}
