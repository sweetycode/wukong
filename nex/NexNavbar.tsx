import type { ComponentChild } from "preact";
import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer";

const defaultStyles = {
    container: `border-b border-gray-100 shadow-sm`,
    elementsContainer: `max-w-4xl mx-auto p-4 flex`,
    logoContainer: ``,
    linksContainer: ``,
    link: ``,
}

export function NexNavbar({logo, links, mixer}: {
    logo: ComponentChild,
    links: {text: string, href: string}[],
    mixer?: StyleMixer<typeof defaultStyles>,
}) {
    const styles = applyStyleMixer(defaultStyles, mixer)
    return <div className={styles.container}>
        <div className={styles.elementsContainer}>
            <div className={styles.logoContainer}>
                {logo}
            </div>
            <div className={styles.linksContainer}>
                {links.map(({text, href}) => <a href={href} className={styles.link}>{text}</a>)}
            </div>
        </div>
    </div>
}