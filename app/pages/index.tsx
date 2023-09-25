/*
  index.tsx
  Homepage for AST Configurator
*/
import React from "react";
import gconfig from "../groups.config";
import config, { isCustom } from "../screens.config";
import GroupBuilder from "../screens/group";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export interface IPage {
  /** The router for the application */
  router: {
    /** Pushes a page onto the routing stack. Please don't push backwards. */
    push: (page: number | ((old: number) => number)) => void
    /** Pops a page off the routing stack */
    back: () => void
    /** Checks to see if a page is on the routing stack */
    onPath: (page: number) => boolean
    /** A boolean indicating if the last navigation action was a back button press */
    movedBack: boolean;
  }
}

const pages = config.screens.map(s => isCustom(s) ? s.component : GroupBuilder(gconfig.groups.findIndex(g => g.name === s.name)))

const AppPage = () => {
  const [stack, setStack] = React.useState<number[]>([0]);
  const [movedBack, setMovedBack] = React.useState<boolean>(false);


  const push = (index: number | ((page: number) => number)) => {
    setMovedBack(false);
    setStack(stack.concat(typeof index === "number" ? index : index(stack[stack.length - 1])));
  }


  const back = () => {
    setMovedBack(true);
    setStack(stack.slice(0, -1))
  }

  const onPath = (index: number) => stack.includes(index)

  const Page = React.useMemo(() => pages[stack[stack.length - 1]]
  , [stack])

  return <div>
    <Navbar /> <Page router={{push, back, onPath, movedBack}}/> <Footer />
  </div> 
};

export default AppPage;
