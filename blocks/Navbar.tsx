import type { SimpleLink } from "@wukong/components/types";
import type { ComponentChildren } from "preact";

export default function Navbar({links, children}: {links: SimpleLink[], children?: ComponentChildren}) {
    return <nav className="max-w-4xl p-4 mx-auto flex max-md:flex-wrap justify-between">
        {/* toggle button */}
        <div className="flex md:hidden">
            <button className="">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        {/* logo */}
        <a href="/" className="flex items-center space-x-2">
            {/* TODO */}
            {children}
            <span class="text-2xl font-semibold whitespace-nowrap">JSToolX</span>
        </a>

        {/* nav items */}
        <div className="md:flex items-center max-md:w-full max-md:order-3">
            <ul className="flex max-md:flex-col md:items-center font-medium md:space-x-8 max-md:mt-4 max-md:p-4 max-md:rounded-lg max-md:border max-md:border-gray-100">
                {links.map(({text, href}) => <li>
                    <a href={href} className="block md:hover:text-blue-700 max-md:py-2 max-md:px-3 max-md:rounded max-md:hover:bg-gray-100">{text}</a>
                </li>)}
            </ul>
        </div>

        {/* right box */}
        <div className="w-16 max-md:order-2">
        </div>
    </nav>
}