import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer";

const defaultStyles = {
    container: `text-xs text-gray-400 space-x-1 my-4`,
    link: ``,
    seperator: ``,
    text: ``,
}

export function NexBreadcrumb({links, text, mixer}: {
    links: {text: string, href: string}[],
    text: string,
    mixer?: StyleMixer<typeof defaultStyles>
}) {
    const styles = applyStyleMixer(defaultStyles, mixer)
    return <div className={styles.container}>
        {links.map(({text, href}) => <><a href={href} className={styles.link}>{text}</a><span className={styles.seperator}>»</span></>)}
        <span className={styles.text}>{text}</span>
    </div>
}