/**
 * finish.tsx
 * The page for downloading/saving the output
 */

import Head from "next/head";
import { useDispatch } from "react-redux";
import MultiFormResView from "../components/MultiFormResView/MultiFormResView";
import NavFooter from "../components/NavFooter/NavFooter";
import { QuestionV2 } from "../components/Section/types";
import { isSelect } from "../components/Section/utils";
import NavButton from "../components/StyledButton/StyledButton";
import config from "../groups.config";
import { IPage } from "../pages";
import { Dispatch } from "../state/store";
import pagestyles from "./styles/FooterPage.module.css";
import { useState, useEffect } from "react";

/* class to build QuickLink for CloudFormation */
class QuickLink {
  region: string;
  templatePath: string;
  stackName?: string;
  paramsDict?: Record<string, string>;
  paramsKey: string;

  constructor(region: string, templatePath: string, stackName?: string, paramsDict?: Record<string, string>, paramsKey = 'MainStackParams') {
    this.region = region;
    this.templatePath = templatePath;
    this.stackName = stackName;
    this.paramsDict = paramsDict;
    this.paramsKey = paramsKey;
  }

  getParamsUrlEncoded(): string {
    const PARAMS_DICT = this.paramsDict || [];

    const my_list: string[] = [];
    Object.entries(PARAMS_DICT).forEach(([k, v]) => {
      my_list.push(`${k}=${v}`);
    });

    const PARAMS_STRINGIFY = JSON.stringify(my_list);
    return encodeURIComponent(PARAMS_STRINGIFY);
  }

  getParamsQueryParam(): string {
    let paramsQueryParam = `&param_${this.paramsKey}=${this.getParamsUrlEncoded()}`;
    if (this.stackName) {
      paramsQueryParam += `&stackName=${this.stackName}`;
    }
    return paramsQueryParam;
  }

  getBaseUrl(): string {
    const REGION = this.region;
    const isGov = /gov/g.test(REGION);
    let DOMAIN;
    if (isGov) {
      DOMAIN = "amazonaws-us-gov.com";
    } else {
      DOMAIN = "aws.amazon.com"; //TODO should this be amazonaws.com OR aws.amazon.com
    }
    //let link = `https://${REGION}.console.${DOMAIN}/cloudformation/home?region=${REGION}#/stacks/create/review`;
    let link = `https://console.${DOMAIN}/cloudformation/home#/stacks/create/review`;
    return link;
  }

  getTemplateQueryParam(): string {
    const queryParam = `?templateURL=${this.templatePath}`;
    return queryParam;
  }

  get(): string {
    const baseUrl = this.getBaseUrl();
    const templateQueryParam = this.getTemplateQueryParam();
    const paramsQueryParam = this.getParamsQueryParam();
    const url = baseUrl + templateQueryParam + paramsQueryParam;
    return url;
  }
}

interface ConfigArtifact {
  Questions: Array<QuestionOutput>;
}

interface QuestionOutput {
  Label: string;
  Value: string;
}

const group = config.groups[1].sections;

const valueToOutput = (question: QuestionV2, value: string) => {
  // Format multiselect questions from JSON to CSVs
  if (isSelect(question) && question.type === "select") {
    const v_ = JSON.parse(value) as string[]
    return v_.join(",")
  }
  return value
}

const Finish = ({ router: { push, back } }: IPage) => {
  const dispatch = useDispatch<Dispatch>();
  const show = group.filter((s) =>
    s.data.conditions.reduce(
      (acc, cond) =>
        acc && (dispatch.bank.lazilyTestCondition(cond) as boolean),
      true
    )
  );

  const createConfigData = () => {
    return show
      .map((s) =>
        (dispatch.bank.getSection(s.name) as string[]).map(
          (value: string, idx: number) =>
            `${s.data.questions[idx].id}=${valueToOutput(s.data.questions[idx], value)}`
        )
      )
      .flat();
  };

  const createConfigBlob = () => {
    return new Blob([JSON.stringify(createConfigData(), undefined, 2)]);
  };

  const download = () => {
    const blob = createConfigBlob();
  
    // Simulate link press to get file to download
    const link = document.createElement("a");
    link.download = "ast-config.json"; //TODO allow user to name file upon save
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
  
    link.dispatchEvent(evt);
    link.remove();
  };

  //populate json content to textbox
  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const populateJsonTextbox = () => {
    const content = JSON.stringify(createConfigData(), undefined, 2);
    setJsonContent(content);
  };

  const createConfigDataForUrl = () => {
    const configData = show
      .map((s) =>
        (dispatch.bank.getSection(s.name) as string[]).map(
          (value: string, idx: number) =>
            [s.data.questions[idx].id, valueToOutput(s.data.questions[idx], value)]
        )
      )
      .flat();
  
    return Object.fromEntries(configData);
  };
  
  //build the quicklink using parameters from the configurator questions
  const [urlContent, setUrlContent] = useState<string | null>(null);
  const createQuicklink = () => {
    const REGION = 'us-gov-west-1';
    
    //BUILD TEMPLATE LINK
    // Capture parameters from the configuration data
    const configDataArray = createConfigData();
    const configData = configDataArray.join(','); // Join the array elements into a single string
    const keyValuePairs = configData.split(','); // Split the config data into individual key-value pairs
    let extractedValues: { [key: string]: string } = {}; // Create an object to store the extracted values
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      extractedValues[key] = value;
    });

    // Capture parameters from the configuration data
    const QSS3KeyPrefix = extractedValues['QSS3KeyPrefix']; //default is "quickstart-ammos-smallsat-toolkit/"
    const QSS3BucketRegion = extractedValues['QSS3BucketRegion']; //default is "us-east-1"
    const QSS3BucketName = extractedValues['QSS3BucketName']; //default is "aws-quickstart"
    const ProjectName = extractedValues['ProjectName']; //example: myproject
    const RolePath = extractedValues['RolePath']; //example: /am-a2c/
    const PermissionsBoundaryArn = extractedValues['PermissionsBoundaryArn']; //example: arn:aws-us-gov:iam::016915823617:policy/Security_Boundary_NoIAM
    const yamlFilename = "entry.yaml"; //default is "entry.yaml"

    const parameters_temp = `&param_QSS3BucketName=${QSS3BucketName}&param_QSS3BucketRegion=${REGION}&param_QSS3KeyPrefix=${QSS3KeyPrefix}&param_ProjectName=${ProjectName}&param_RolePath=${RolePath}&param_PermissionsBoundaryArn=${PermissionsBoundaryArn}`;
    const TEMPLATE = `https://${QSS3BucketName}.s3-${QSS3BucketRegion}.amazonaws.com/${QSS3KeyPrefix}templates/${yamlFilename}` + parameters_temp;

    //hardcoded version for reference, delete later
    //const parameters_temp = '&param_QSS3BucketName=a2c-qs-assets&param_QSS3BucketRegion=us-gov-west-1&QSS3KeyPrefix=ast-jjen/&param_ProjectName=demo&param_RolePath=/am-a2c/&param_PermissionsBoundaryArn=arn:aws-us-gov:iam::016915823617:policy/Security_Boundary_NoIAM';
    //const TEMPLATE = 'https://a2c-qs-assets.s3-us-gov-west-1.amazonaws.com/ast-jjen/templates/entry.yaml' + parameters_temp;

    const STACK = 'demo';
    const PARAMS = createConfigDataForUrl();

    const quickLink = new QuickLink(REGION, TEMPLATE, STACK, PARAMS);
    setUrlContent(quickLink.get());
  };
  
  //fill textboxes when the page loads
  useEffect(() => {
    populateJsonTextbox();
    createQuicklink();
  }, []);

  //copies json content to clipboard
  const copyToClipboard = (content: string | null) => {
    const preElement = document.querySelector('pre'); //TODO select specific class instead of <pre>
    
    if (!preElement) { //check if the <pre> element exists
      console.error("No <pre> element found");
      return;
    }
    
    //create a range object and select the content within the <pre> element
    const range = document.createRange();
    range.selectNode(preElement);

    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range); //add the new range to the selection
    document.execCommand('copy'); //copy the selected content to the clipboard (TODO: it's deprecated)
    window.getSelection()?.removeAllRanges(); //clean up the selection
  };

  const copyUrlToClipboard = (content: string | null) => {
    var tempInput = document.createElement("input");
    var contentToCopy = content;
    tempInput.value = contentToCopy || "";
    document.body.appendChild(tempInput); //append the input element to the DOM
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); //for mobile devices
    document.execCommand("copy"); 
    document.body.removeChild(tempInput); //remove the temporary input element from the DOM
  };

  const openUrl = (url: string | null) => {
    if (!url) {
      return;
    }
  
    var tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.target = "_blank"; 
    document.body.appendChild(tempLink); // Append the link element to the DOM
    tempLink.click(); // Simulate a click on the link to open it in a new tab
    document.body.removeChild(tempLink); // Remove the temporary link element from the DOM
  };
  

  // Render form results
  return (
    <>
      <Head>
        <title>Download - AST Configurator</title>
      </Head>
      <div className={pagestyles.container}>
        <div className={pagestyles.content}>
          <div className={pagestyles.messageWrapper}>
            <div className={pagestyles.outputContainer}>
              <h2 className={pagestyles.header}>Your software is configured!</h2>
              <p>Thanks for choosing AMMOS SmallSat Toolkit!</p>
              <p>Click the link below to go directly to the Cloud Formation page on AWS and get started.</p>
              <p>On the right, you can download or copy your config file, upload it to AWS, and launch the Quick Start. Read more about how to set this up in{" "}
              <a href="https://aws-quickstart.github.io/quickstart-ammos-smallsat-toolkit/">
                The Deployment Guide
                {/* <svg
                className={pagestyles.linkArrow}
                width="18"
                height="18"
                viewBox="0 0 448 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"
                    fill="#FFFFFF"
                />
                </svg>  */}
              </a>.</p>
              <div className={pagestyles.saveButtons}>
                <NavButton
                  onPress={() => openUrl(urlContent)}
                  text="Launch on AWS"
                  enabled={true}
                  id="launchOnAWS"
                />
              </div>
            </div>
            <div className={pagestyles.outputContainer}>
              <h2 className={pagestyles.header}>‎</h2>
              <div className={pagestyles.downloadBox}> 
                <h3>Download</h3>
                <div className={pagestyles.downloadFileWrapper}>
                  ast-config.json
                  <div className={pagestyles.downloadIconContainer}>
                    <svg
                    className={pagestyles.downloadIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={download}
                    >
                    <path
                        d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
                        fill="#FFFFFF"
                    />
                    </svg>
                  </div>
                </div>
                {/* <div className={pagestyles.saveButtons}>
                  <NavButton
                    onPress={download}
                    text="Download"
                    enabled={true}
                    id="downloadJson"
                  />
                </div> */}
                <h3>Review and Copy</h3>
                <div className={pagestyles.textCopyBox}>
                  <pre className={pagestyles.jsonPre}>{jsonContent}</pre>
                </div>
              </div>
            </div>
          </div>
          <div className={pagestyles.button_container}>
            {
              // Link back to previous page w/o params
            }
            <NavButton
              text="Go Back"
              id="back"
              arrow="left"
              enabled={true}
              onPress={back}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Finish;
