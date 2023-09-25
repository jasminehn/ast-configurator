/**
 * config.tsx
 * Configuration for loading sections into the application
 */

import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { IPage } from "./pages";

 interface IScreenConfig {
   screens: Array<Screen | CustomScreen>;
 }
 
 interface Screen {
   name: string;
   type: string
 }
 
 interface CustomScreen extends Screen {
   component: ComponentType<IPage>
 }
 
 const config: IScreenConfig = {
   screens: [
     {
       name: "Home",
       type: "screen",
       component: dynamic(() => import("./screens/home")),
     },
     {
       name: "pre",
       type: "group"
     },
     {
       name: "select",
       type: "screen",
       component: dynamic(() => import("./screens/select"))
     },
     {
       name: "post",
       type: "group"
     },
     {
       name: "review",
       type: "screen",
       component: dynamic(() => import("./screens/review"))
     },
     {
       name: "finish",
       type: "screen",
       component: dynamic(() => import("./screens/finish"))
     }
   ],
 };
 
 export const isCustom = (o: any): o is CustomScreen => {
   return typeof o === "object" && o.type === "screen"
 }
 
 export default config;
 