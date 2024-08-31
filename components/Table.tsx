import {ComponentChildren } from "preact"

export default function Table({headers, children, className=''}: {
    headers: string[],
    children: ComponentChildren,
    className?: string,
}) {
    return <table className={`w-full text-sm text-left text-gray-500 border border-gray-200 rounded ${className}`}>
        {headers && <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>{headers.map(header => <th className="px-4 py-3">{header}</th>)}</tr>
            </thead>}
        <tbody>
            {children}
        </tbody>
    </table>
}

export function TableRow({children, className=''}: {children: ComponentChildren, className?: string}) {
    return <tr className={`bg-white border-b even:bg-gray-50 ${className}`}>
        {children.map(item => <td className="px-4 py-3">{item}</td>)}
    </tr>
}
