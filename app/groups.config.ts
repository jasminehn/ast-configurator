/**
 * config.tsx
 * Configuration for loading sections into the application
 */

import type { Section } from "./components/Section/types";

interface IGroupConfig {
  /** The list of all groups */
  groups: Array<{
    /** The name of the group */
    name: string;
    /** The sections within the group */
    sections: Array<{
      /** name of the section */
      name: string;
      /** Section data imported from JSON */
      data: Section;
    }>;
  }>;
}

const config: IGroupConfig = {
  groups: [
    {
      name: "pre",
      sections: [
        { name: "pre1", data: require("./data/pre/section.json") },
      ],
    },
    {
      name: "post",
      sections: [
        { name: "0", data: require("./data/post/0_Deployments.json")},
        { name: "1", data: require("./data/post/1_BasicInfo.json")},
        { name: "2", data: require("./data/post/2_IAM.json")},
        { name: "3", data: require("./data/post/3_Quickstart.json")},
        { name: "4", data: require("./data/post/4_AIT.json")},
        { name: "5", data: require("./data/post/5_SSLCert.json")},
        { name: "6", data: require("./data/post/6_R53Zone.json")},
        { name: "7", data: require("./data/post/7_DeployVpc.json")},
        { name: "8", data: require("./data/post/8_ExistingVpc.json")},
      ],
    },
  ],
};

export default config;
