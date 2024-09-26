import { injectScript } from "../utilities/dom";

const emojiMapping = {
    'no': 10060,
    'yes': 9989,
}

function emojify(name) {
    const cp = emojiMapping[name]
    if (cp) {
        return `&#${cp}`
    }
    return name
}

const emojiExtension = {
    name: 'emoji',
    level: 'inline',
    start(src) { return src.indexOf(':')},
    tokenizer(src) {
        const rule = /^:(\w+):/
        const match = rule.exec(src)
        if (match) {
            return {
                type: 'emoji',
                raw: match[0],
                emoji: match[1],
            }
        }
    },
    renderer(token) {
        return emojify(token.emoji)
    },
}


const classNamePrefixerExtension = {
    name: 'classNamePrefixer',
    level: 'block',
    start(src: string) {
        const match = src.match(/^\.[a-zA-Z0-9\-]{1,9} /)
        if (match) return match.index
    },
    tokenizer(src) {
        const rule = /^\.([a-zA-Z0-9\-]{1,9}) (.*)/
        const match = rule.exec(src)
        if (match) {
            const tokens = []
            this.lexer.inlineTokens(match[2], tokens)

            return {
                type: 'classNamePrefixer',
                raw: match[0],
                className: match[1],
                tokens,
            }
        }
    },
    renderer(token) {
        return `<p class="${token.className}">${this.parser.parseInline(token.tokens)}</p>`
    }
}

const renderer = {
    link({href, text}: {href?: string, text: string}) {
        if (!href) return false
        const match = href.match(/^([\w]+)=/)
        if (!match) return false

        const name = match[1]
        const value = href.substring(match[0].length)
        return `<span data-${name}="${value}">${text}</span>`
    },
}


export async function renderMarkdown({markdown}: {markdown: string}): Promise<string> {
    const marked = await injectScript('https://cdn.jsdelivr.net/npm/marked@14.0.0/lib/marked.umd.min.js', () => {
        const marked = window['marked']
        marked.use({
            breaks: true,
            renderer,
            extensions: [emojiExtension, classNamePrefixerExtension],
        })
        return marked
    })
    return marked.parse(markdown)
}