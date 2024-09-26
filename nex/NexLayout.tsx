import type { ComponentChild, ComponentChildren } from "preact";
import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer";
import { clz } from "../utilities/clx";


export const nexContainerStyles = {
    maxWidth: `max-w-4xl`,
    margin: `mx-auto`,
    padding: `p-4`,
}

export const nexContainerClasses = Object.values(nexContainerStyles).join(' ')

export function NexContainer({children, mixer, className}: {
    children: ComponentChildren,
    mixer?: StyleMixer<typeof nexContainerStyles>,
    className?: string,
}) {
    const styles = applyStyleMixer(nexContainerStyles, mixer)
    return <div className={clz(styles.maxWidth, styles.margin, styles.padding, className)}>{children}</div>
}


export const nexTwoColumnLayoutStyles = {
    container: `md:flex md:space-x-4 max-md:space-y-4`,
    mainColumn: `md:w-9/12`,
    sideColumn: `md:w-3/12`,
}

export function NexTwoColumnLayout({children, mixer}: {
    children: [ComponentChild, ComponentChild],
    mixer?: StyleMixer<typeof nexTwoColumnLayoutStyles>
}) {
    if (!(children instanceof Array) || children.length != 2) {
        throw Error(`Can't render two column layout with ${children}, it must has 2 elements children.`)
    }
    const styles = applyStyleMixer(nexTwoColumnLayoutStyles, mixer)
    return <div className={styles.container}>
        <div className={styles.mainColumn}>{children[0]}</div>
        <div className={styles.sideColumn}>{children[1]}</div>
    </div>
}