import type { ComponentChildren } from "preact";
import { clz } from '../utilities/clx';


export default function BasicNavbar({logo, className}: {
    logo: ComponentChildren,
    className?: string,
}) {
    return <nav className={clz('mx-auto flex justify-center', className)}>
        <a href="/" className="flex items-center">{logo}</a>
    </nav>
}
