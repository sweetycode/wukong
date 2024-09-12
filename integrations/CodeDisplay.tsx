import { useEffect, useState } from "preact/hooks"

export default function CodeDisplay({code, lang, theme='github-light-default', className=''}: {
    code: string,
    lang: string,
    theme?: 'github-light'|'github-light-default'|'github-dark'|'github-dark-default',
    className?: string,
}) {
    const [html, setHtml] = useState<string>(null)
    useEffect(() => {
        (async () => {
            //const {codeToHtml} = await import('https://esm.run/shiki')
            //setHtml(await codeToHtml(code, {lang, theme}))
        })()
    }, [code, lang, theme])
    return <div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
}
