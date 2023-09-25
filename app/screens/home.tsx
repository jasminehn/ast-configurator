/**
 * Home.tsx
 * The landing screen
 */

import Head from "next/head";
import NavButton from "../components/StyledButton/StyledButton";
import { IPage } from "../pages";
import styles from "./styles/Home.module.css";

import Navbar from "../components/Navbar/Navbar";



const Home = ({ router: {push} }: IPage) => (
  <>
    <Head>
      <title>AST Configurator</title>
    </Head>
    {/* <Navbar /> */}
    <div className={styles.container}>
      <div className={styles.header}>Is AST Right for You?</div>
      <p>
        Is your mission either a{" "}
        <a href="https://nodis3.gsfc.nasa.gov/npg_img/N_PR_8705_0004_/N_PR_8705_0004__appendixb.pdf">
          C or D classification
        </a>
        ? Do you need{" "}
        {
          // TODO: determine correct link for this
        }
        <a href="https://wiki.jpl.nasa.gov/pages/viewpage.action?spaceKey=GST&title=Software+Classification+Process">
          SLE downlink processing and uplink transmission
        </a>
        ? Does the mission use 0 or 1 instruments? If the answer to all of these
        questions is yes, continue to the AST Questionnaire to bundle the
        necessary software and configure your AWS Quick Start
      </p>
      <p>
        If AST isn&apos;t suitable for your mission, you can find what you need
        at <a href="https://ammos.nasa.gov">ammos.nasa.gov</a>
      </p>
      <div className={styles.button_container}>
          <NavButton
            text="I know what I need"
            id="select"
            enabled={true}
            onPress={() => push(2)}
          />
          <NavButton
            text="Continue to Questionnaire"
            id="ques"
            arrow="right"
            enabled={true}
            onPress={() => push(1)}
          />
      </div>
    </div>
  </>
);

export default Home;
