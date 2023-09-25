/**
 * Footer.tsx
 * Displays a footer at the bottom of all pages.
 */

import styles from "./Footer.module.css";
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.globalFooter}>
            <div className={styles.footerWrapper}>
                <div className={styles.nasaLogo}>
                    <Image
                        src="/images/nasa-logo-1.png"
                        alt=""
                        width={80}
                        height={80}
                    />
                </div>
                <div className={`${styles.footerLinksWrapper} ${styles.group1}`}>
                    <div className={`${styles.footerLinks} ${styles.nasaInfo}`}>
                        <h2>The National Aeronautics and Space Administration</h2>
                        <p className={styles.description}>As explores, pioneers, and innovators, we boldly expand frontiers in air and space to inspire and serve America and to benefit the quality of life on Earth. </p>
                        <ul className={styles.footerLinks}>
                            <li>About NASA&apos;s Mission</li>
                            <li>
                                Join Us 
                                <svg
                                className={styles.arrowRight}
                                width="16"
                                height="16"
                                viewBox="0 0 512 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"
                                    fill="#F64137"
                                />
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className={styles.footerLinks}>
                            <li>Home</li>
                            <li>News & Events</li>
                            <li>Galleries</li>
                            <li>NASA TV <span className={styles.liveThing}>Live</span></li>
                        </ul>
                    </div>
                    <div>
                        <ul className={styles.footerLinks}>
                            <li>Misions</li>
                            <li>Humans in Space</li>
                            <li>Climate Change</li>
                            <li>The Solar System</li>
                            <li>The Universe</li>
                        </ul>
                    </div>
                    <div>
                        <ul className={styles.footerLinks}>
                            <li>Aeronautics</li>
                            <li>Technology</li>
                            <li>Science & Research</li>
                            <li>Learning Resources</li>
                            <li>About NASA</li>
                        </ul>
                    </div>
                    <div className={styles.footerLinks}>
                        <div className={styles.socials}>
                            <p>Follow NASA</p>
                            <span className={styles.socialLinks}>
                                <svg
                                className={styles.linkIcon}
                                width="26"
                                height="26"
                                viewBox="0 0 320 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                    fill="#FFFFFF"
                                />
                                </svg>
                                <svg
                                className={styles.linkIcon}
                                width="26"
                                height="26"
                                viewBox="0 0 448 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                    fill="#FFFFFF"
                                />
                                </svg>
                                <svg
                                className={styles.linkIcon}
                                width="26"
                                height="26"
                                viewBox="0 0 512 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                    fill="#FFFFFF"
                                />
                                </svg>
                                <svg
                                className={styles.linkIcon}
                                width="26"
                                height="26"
                                viewBox="0 0 576 512"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                                    fill="#FFFFFF"
                                />
                                </svg>
                            </span>
                        </div>
                        <ul className={styles.footerLinks}>
                            <li>More NASA Social Accounts</li>
                            <li>NASA Newsletters</li>
                        </ul>
                    </div>
                </div>
                {/* <hr /> */}
                <hr  style={{
                    margin: '20px 0',
                    borderColor : '#19191a',
                    height: '1px',
                    width: '100%'
                }}/>
                <div className={`${styles.footerLinksWrapper} ${styles.group2}`}>
                    <ul className={styles.footerLinks}>
                        <li>All Topics A-Z</li>
                        <li>Sitemap</li>
                        <li>For Media</li>
                        <li>Privacy Policy</li>
                        <li>FOIA</li>
                        <li>No FEAR Act</li>
                        <li>Office of the IG</li>
                        <li>Budget & Annual Reports</li>
                        <li>Contact NASA</li>
                    </ul>
                </div>
                <div className={`${styles.footerLinksWrapper} ${styles.group3}`}>
                    <p>Page Last Updated: <b>April 24, 2023</b></p>
                    <p>NASA Official: <b>Brian Dunbar</b></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 