import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer"

const defaultStyles = {
    container: ``,
    elementsContainer: ``,
    link: ``,
    text: ``,
}

export function NexPagination({pages, mixer}: {
    pages: {text: string, href?: string}[],
    mixer: StyleMixer<typeof defaultStyles>,
}) {
    const styles = applyStyleMixer(defaultStyles, mixer)
    return <div className={styles.container}>
        <div className={styles.elementsContainer}>
            {pages.map(({text, href}) => href ? <a href={href} className={styles.link}>{text}</a>: <span className={styles.text}>{text}</span>)}
        </div>
    </div>
}