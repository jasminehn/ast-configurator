/**
 * NavFooter.tsx
 * The footer container that sits on most pages
 */

import type { ReactNode } from "react";
import styles from "./NavFooter.module.css";

interface NavFooterProps {
    children: ReactNode[]
}

const NavFooter = ({children}: NavFooterProps) => {
    return <footer className={styles.footer}>
        {children}
    </footer>
}

export default NavFooter;