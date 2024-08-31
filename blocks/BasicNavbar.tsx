import type { ComponentChildren } from "preact";


export default function BasicNavbar({logo, className}: {
    logo: ComponentChildren,
    className?: string,
}) {
    return <nav className={`mx-auto flex justify-center ${className}`}>
        <a href="/" className="flex items-center">
            {logo}
        </a>
    </nav>
}
