/**
 * review.tsx
 * The page for reviewing the results from the "post" group
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

interface ConfigArtifact {
  Questions: Array<QuestionOutput>;
}

interface QuestionOutput {
  Label: string;
  Value: string;
}

const group = config.groups[1].sections;

/*
const valueToOutput = (question: QuestionV2, value: string) => {
  // Format multiselect questions from JSON to CSVs
  if (isSelect(question) && question.type === "select") {
    const v_ = JSON.parse(value) as string[]
    return v_.join(",")
  }
  return value
}
*/

const Review = ({ router: { push, back } }: IPage) => {
  const dispatch = useDispatch<Dispatch>();
  const show = group.filter((s) =>
    s.data.conditions.reduce(
      (acc, cond) =>
        acc && (dispatch.bank.lazilyTestCondition(cond) as boolean),
      true
    )
  );

  /*
  const download = () => {
    const blob = new Blob([
      JSON.stringify({
        Questions: show
          .map((s) =>
            (dispatch.bank.getSection(s.name) as string[]).map(
              (value: string, idx: number) => {
                return { Label: s.data.questions[idx].id, Value: valueToOutput(s.data.questions[idx], value) };
              }
            )
          )
          .flat(),
      }, undefined, 2),
    ]);

    // Simulate link press to get file to download
    const link = document.createElement("a")
    link.download = "config.json"
    link.href = window.URL.createObjectURL(blob)
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":")
    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
  };
  */

  // Render form results
  return (
    <>
      <Head>
        <title>Review - AST Configurator</title>
      </Head>
      <div className={pagestyles.container}>
        <h2 className={pagestyles.header}>Review Configuration</h2>
        <div className={pagestyles.content}>
          <MultiFormResView data={show} />
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
            <NavButton
              text="Confirm"
              id="next"
              arrow="right"
              enabled={true}
              onPress={() => push((idx) => idx + 1)}
              cy-data="next-button"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
