/*
  select.tsx
  Software selection screen.
*/

import _ from "lodash";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import NavFooter from "../components/NavFooter/NavFooter";
import SoftwareSelector, {
  errSoftware
} from "../components/SoftwareSelector/SoftwareSelector";
import { Software } from "../components/SoftwareSelector/types";
import NavButton from "../components/StyledButton/StyledButton";
import sw from "../data/software.json";
import { IPage } from "../pages";
import { Dispatch } from "../state/store";
import pagestyles from "./styles/FooterPage.module.css";

const Select = ({ router: { push, back, onPath } }: IPage) => {
  const software: Software[] = sw.software;

  const dispatch = useDispatch<Dispatch>();

  // get the value within the select store
  const selectedStored = dispatch.select.getSelected() as {
    id: string;
    state: boolean | undefined;
  }[];
  // the full list of software mapped to if it's selected, init w/ store
  const [selected, setSelected] =
    useState<{ id: string; state: boolean | undefined }[]>(selectedStored);

  // Show all software if coming from homepage, otherwise check form for software
  const data = useMemo(
    () =>
      onPath(1)
        ? software
            .filter((s) =>
              s.conditions.reduce(
                (acc, cond) =>
                  acc && (dispatch.bank.lazilyTestCondition(cond) as boolean),
                true
              )
            )
            .map((s) => s.id)
        : software.map((s) => s.id),
    [onPath, software]
  );

  // Update selected once the included software is determined
  useEffect(() => {
    // If the software to display is different than the cached values, set all displayed
    // software to `true` and rest to "undefined"
    if (!_.isEqual(_.sortBy(selectedStored.filter(s => typeof s.state != "undefined").map(s => s.id)), _.sortBy(data))) {
      setSelected((old) =>
        old.map((s) => {
          return { id: s.id, state: data.includes(s.id) ? true : undefined };
        })
      );
    }
  }, [data]);

  // Update store whenever the selected values change
  useEffect(() => {
    dispatch.select.setSelected({ selected: selected });
  }, [selected]);

  // calc top checkbox state
  const allCheck = data
    .map((id) => selected.find((s) => s.id === id)?.state ?? false)
    .includes(true);

  // toggle all checkboxes for first checkbox
  const toggleAllCheck = () =>
    setSelected((s) =>
      s.map((s) => {
        return { ...s, state: !allCheck };
      })
    );

  return (
    <>
      <Head>
        <title>Select - AST Configurator</title>
      </Head>
      <div className={pagestyles.container}>

      {/* hardcoded temporarily */}
      <div className={pagestyles.progressBar}>
            <h2>AST Configurator</h2>
            <div className={pagestyles.progressBarWrapper}>
                <div className={pagestyles.barPartWrapper}>
                    <div className={pagestyles.steps}>
                        <hr className={pagestyles.completed} /><hr className={pagestyles.current} />
                    </div>
                    <h3>Questionnaire</h3>
                    <p>Step 2 of 2</p>
                </div>
                <div className={pagestyles.barPartWrapper}>
                    <div className={pagestyles.steps}>
                        {/*<hr /><hr /><hr /><hr />*/}
                        <hr />
                    </div>
                    <h3>Configuration</h3>
                    <p>Not Started</p>
                </div>
            </div>
        </div>

        <h2 className={pagestyles.header}>Review Recommended Software</h2>
        <div className={pagestyles.content}>
          <SoftwareSelector
            software={
              // limit displayed software to the ids in `data`
              data.map((id) => software.find((s) => s.id === id) ?? errSoftware)
            }
            selected={data.map(s => selected.find(o => o.id === s) ?? {id: s, state: true})}
            onCheck={
              // Correctly update state when a checkbox calls back on update
              // (id) => setSelected(new Map(selected.set(id, !selected.get(id))))
              (id) =>
                setSelected((sel) =>
                  sel.map((s) => {
                    return { ...s, state: s.id === id ? !s.state : s.state };
                  })
                )
            }
            allCheck={allCheck}
            onAllCheck={toggleAllCheck}
          />
          <div className={pagestyles.button_container}>
            <NavButton
              text="Go Back"
              arrow="left"
              id="back"
              enabled={true}
              onPress={back}
            />
            <NavButton
              text="Continue"
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
export default Select;
