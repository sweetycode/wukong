import type { ComponentChildren } from "preact";
import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer";


const basicNavbarStyles = {
    containerStyle: `mx-auto flex p-4 justify-center`,
    logoStyle: `flex items-center`,
}

export default function BasicNavbar({logo, mixer}: {
    logo: ComponentChildren,
    mixer?: StyleMixer<typeof basicNavbarStyles>
}) {
    const styles = applyStyleMixer(basicNavbarStyles, mixer)
    return <nav className={styles.containerStyle}>
        <a href="/" className={styles.logoStyle}>{logo}</a>
    </nav>
}
