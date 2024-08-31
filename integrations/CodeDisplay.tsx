import { useEffect, useState } from "preact/hooks"

export default function CodeDisplay({code, codeToHtml, className=''}: {
    code: string,
    className?: string,
    codeToHtml: (code: string) => Promise<String>
}) {
    const [html, setHtml] = useState<string>()
    useEffect(() => {
        codeToHtml(code).then(setHtml)
    }, [code])
    return <div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
}
