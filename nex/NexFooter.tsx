import type { ComponentChild } from "preact";
import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer";

const defaultStyles = {
    container: `text-sm text-gray-500 text-center mt-6 py-4 bg-gray-50`,
    elementsContainer: `max-w-4xl mx-auto p-4 space-y-3`,
    linksContainer: ``,
    link: ``,
    copyRight: ``,
}

export function NexFooter({links, copyRight, mixer}: {
    links: {text: string, href: string}[],
    copyRight?: ComponentChild,
    mixer?: StyleMixer<typeof defaultStyles>
}) {
    const styles = applyStyleMixer(defaultStyles, mixer)
    return <div className={styles.container}>
        <div className={styles.elementsContainer}>
            <div className={styles.linksContainer}>{links.map(({text, href}) => <a href={href} className={styles.link}>{text}</a>)}</div>
            <div className={styles.copyRight}>{copyRight}</div>
        </div>
    </div>
}