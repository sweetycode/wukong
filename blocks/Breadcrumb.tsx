import Link2 from "../components/Link2"

export interface BreadcrumbLink {
    href?: string
    text: string
}

export default function Breadcrumb({items}: {
    items: BreadcrumbLink[],
}) {
    if (!items) return <></>
    return <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
            <Link2 href={items[0].href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">{items[0].text}</Link2>
        </li>
        {items.slice(1).map(({href, text}) => <li>
            <div class="flex items-center">
                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
                {href
                    ? <Link2 href={href} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2">{text}</Link2>
                    : <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">{text}</span>
                }
            </div>
        </li>)}
    </ol>
}
