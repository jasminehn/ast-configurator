/**
 * Navbar.tsx
 * Displays a navbar at the top of all pages
 */

import styles from "./Navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        // <nav className={styles.navwrapper}>
        //     <ul className={styles.ulwrapper}>
        //         <li className={styles.liwrapper}>
        //         <Link href="/">
        //             <a className={styles.awrapper}>Home</a>
        //         </Link>
        //         </li>
        //         <li className={styles.liwrapper}>
        //         <Link href="/about">
        //             <a className={styles.awrapper}>About</a>
        //         </Link>
        //         </li>
        //         <li className={styles.liwrapper}>
        //         <Link href="/contact">
        //             <a className={styles.awrapper}>Contact</a>
        //         </Link>
        //         </li>
        //     </ul>
        // </nav>
        <div className={styles.wrapper}>
            <header className={styles.globalHeader}>
                <div className={styles.headerWrapper}>
                    <div className={styles.headerItemWrapper}>
                        <p className={styles.itemTitle}>Explore</p>
                        {/* <i className="fa-solid fa-angle-down special"></i> */}
                        <svg
                            className={styles.special}
                            width="15"
                            height="15"
                            viewBox="0 0 448 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                fill="#FFFFFF"
                            />
                        </svg>
                    </div>
                    <div className={styles.searchWrapper}>
                        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                        <svg
                            className={styles.icon}
                            width="10"
                            height="10"
                            viewBox="0 0 512 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                fill="#B9B9BB"
                            />
                        </svg>
                        Search
                    </div>
                    <div className={styles.nasaLogo}>
                        {/* <img src="images/nasa-logo-1.png" alt="" /> */}
                        <Image
                            src="/images/nasa-logo-1.png"
                            alt=""
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className={styles.headerItemWrapper}>
                        <p className={styles.itemTitle}>News & Events</p>
                        <svg
                            className={styles.icon}
                            width="12"
                            height="12"
                            viewBox="0 0 448 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                fill="#FFFFFF"
                            />
                        </svg>
                    </div>
                    <div className={styles.headerItemWrapper}>
                        <p className={styles.itemTitle}>Galleries</p>
                        <svg
                            className={styles.icon}
                            width="12"
                            height="12"
                            viewBox="0 0 448 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                                fill="#FFFFFF"
                            />
                        </svg>
                    </div>
                    <div className={styles.headerItemWrapper}>
                        <p className={styles.itemTitle}>NASA TV</p>
                        <p className={styles.liveThing}>Live</p>
                    </div>
                </div>
            </header>
            <nav className={styles.globalNavbar}>
                <div className={styles.navbarWrapper}>
                    <div className={styles.pagesWrapper}>
                        <span>Home </span>/
                        <span>Topic Name </span>/
                        <span className={styles.activePage}>AST Configurator</span>
                    </div>
                    <div className={styles.navWrapper}>
                        <div className={styles.navItemsList}>
                            <p>Home</p>
                            <p>Services</p>
                            <p>About</p>
                            <p>News</p>
                            <p>Get Involved</p>
                            <p>FAQs</p>
                            <p>Contacts</p>
                        </div>
                    </div>
                    <div className={styles.navPagesWrapper}>
                        <span>Home </span>/
                        <span>Topic Name </span>/
                        <span className={styles.activePage}>AST Configurator</span>
                    </div>
                </div>
            </nav>
            
        </div>
    );
};

export default Navbar; 