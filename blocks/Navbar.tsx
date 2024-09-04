import { ComponentChild, ComponentChildren } from "preact";
import Link2 from "../components/Link2";
import { ClassValue, clz } from '../utilities/clx';

export interface NavbarLink {
    text: string
    href: string
}

export function Navbar({name, links, logo, className}: {
    name: string,
    links: NavbarLink[],
    logo: ComponentChild,
    className: ClassValue[],
}) {
    return <nav className={clz('max-w-4xl p-4 mx-auto flex max-md:flex-wrap justify-between', className)}>
        {/* toggle button */}
        <div className="flex md:hidden">
            <button className="">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <Link2 href="/" className="flex items-center space-x-2">
            {logo}
            <span class="text-2xl font-semibold whitespace-nowrap">{name}</span>
        </Link2>

        {/* nav items */}
        <div className="md:flex items-center max-md:w-full max-md:order-3">
            <ul className="flex max-md:flex-col md:items-center font-medium md:space-x-8 max-md:mt-4 max-md:p-4 max-md:rounded-lg max-md:border max-md:border-gray-100">
                {links.map(({text, href}) => <li>
                    <Link2 href={href} className="block md:hover:text-blue-700 max-md:py-2 max-md:px-3 max-md:rounded max-md:hover:bg-gray-100">{text}</Link2>
                </li>)}
            </ul>
        </div>

        {/* right box */}
        <div className="w-16 max-md:order-2">
        </div>
    </nav>
}
