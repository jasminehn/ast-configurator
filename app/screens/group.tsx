/**
 * group.tsx
 * The standard builder for displaying groups
 */

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import NavFooter from "../components/NavFooter/NavFooter";
import Section from "../components/Section/Section";
import { isSubmittable } from "../components/Section/utils";
import NavButton from "../components/StyledButton/StyledButton";
import config from "../groups.config";
import { IPage } from "../pages";
import { Dispatch } from "../state/store";
import pagestyles from "./styles/FooterPage.module.css";

/** Returns a function that produces a screen given the routing props */
const GroupBuilder = (index: number) => {
  // All the sections within the group
  const allSections = config.groups[index].sections;
  const groupName = config.groups[index].name;
  const Page = ({ router: { push, back, movedBack } }: IPage) => {
    const dispatch = useDispatch<Dispatch>();

    // Get either the first or last section based on nav direction
    const current = useMemo(
      () =>
        movedBack
          ? dispatch.controller.getLast(groupName)
          : dispatch.controller.getFirst(groupName),
      [movedBack]
    );

    // Find section index from current
    const [sectionIdx, setIdx] = useState<number>(() => {
      return allSections.findIndex((g) => g.name === current);
    });

    // Steps to take if the current group member is undefined
    // Can happen do to default conditions not being met on init and current in store being
    // set to "undefined". Runs sanity checks just to make sure before navigating off.
    useEffect(() => {
      // If we weren't able to find the current section (aka it's undefined)
      if (sectionIdx === -1) {
        // As so long as we weren't given an mt group
        if (allSections.length > 0) {
          // If we came from a later page
          if (movedBack) {
            // Get the last possible section from the store
            const prev = dispatch.controller.getLast(groupName);
            // Navigate to the last section if it exists or just go back
            !!prev
              ? setIdx(allSections.findIndex((o) => o.name === prev))
              : back();
          } else {
            // Get the first possible section in the group
            const next = dispatch.controller.getFirst(groupName);
            // Navigate to the next section or the next page if none exists
            !!next
              ? setIdx(allSections.findIndex((o) => o.name === next))
              : push((idx) => idx + 1);
          }
        } else {
          console.error(
            "Please don't input a zero-section group into the application. Why would you do this?"
          );
        }
      }
    }, []);

    // Whether a user has attemped to submit the form
    const [attempted, setAttempted] = useState<boolean>(false);

    // Whenever the section index changes, reset "attempted"
    useEffect(() => {
      setAttempted(false);
    }, [sectionIdx]);

    // Init stored/default values from the store on load
    const [values, setValues] = useState<string[][]>(() => {
      return allSections.map((s) => {
        return dispatch.bank.getSection(s.name) as string[];
      });
    });

    // Calculate whether the form can be submitted based on current
    // values and section
    const canSubmit = useMemo(() => {
      const group = allSections[sectionIdx];
      if (sectionIdx === -1) {
        return false;
      }
      // Use reducer to validate that all conditions are true
      return group.data.questions.reduce((prev, curr, index) => {
        return (
          values &&
          prev &&
          isSubmittable(curr, values[sectionIdx][index]) 
        );
      }, true);
    }, [values, sectionIdx]);

    // The function that gets called whenever a question's value changes
    const updateValue = useCallback(
      (section: number, idx: number, value: string, controller: boolean) => {
        // Update internal values
        setValues((v) =>
          v.map((s, sidx) =>
            sidx === section
              ? s.map((q, qidx) => (qidx === idx ? value : q))
              : s
          )
        );
        // If this is a controller question
        if (controller) {
          // Immediately update within controller state
          dispatch.controller.update({
            id:
              allSections[section].name +
              "." +
              allSections[section].data.questions[idx].id,
            value: value,
          });
        }
      },
      [sectionIdx]
    );

    // A list of Section components to iterate through and conditionally show
    const sections = useMemo(
      () =>
        allSections.map((s, sidx) => (
          <Section
            {...s}
            key={sidx}
            values={values[sidx]}
            onUpdate={(idx, value, controller) =>
              updateValue(sidx, idx, value, controller)
            }
            group={groupName}
            attempted={attempted}
          />
        )),
      [values, attempted, updateValue]
    );

    //this is code related to the progress bar
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <>
        <Head>
          <title>Configure - AST Configurator</title>
        </Head>
        <div className={pagestyles.container}>
        <div className={pagestyles.progressBar}>
            <h2>AST Configurator</h2>
            
            <div className={pagestyles.progressBarWrapper}>
                <div className={pagestyles.barPartWrapper}>
                    {(sectionIdx === 0) && (groupName === "pre") ? (
                      <>
                        <div className={pagestyles.steps}>
                            <hr className={pagestyles.current} /><hr />
                        </div>
                        <h3>Questionnaire</h3>
                        <p>Step 1 of 2</p>
                      </>
                    ) : (
                      
                      <>
                        <div className={pagestyles.steps}>
                            <hr className={pagestyles.completed} /><hr className={pagestyles.completed} />
                        </div>
                        <h3>
                          <svg
                            className={pagestyles.checkIcon}
                            width="18"
                            height="18"
                            viewBox="0 0 448 512"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                fill="#FFFFFF"
                            />
                          </svg>
                          Questionnaire
                        </h3>
                        <p>Complete!</p>
                      </>
                    )}
                    {/* <div className={pagestyles.steps}>
                        <hr className={pagestyles.current} /><hr />
                    </div>
                    <h3>Questionnaire</h3>
                    <p>Step 1 of 2</p> */}
                </div>
                {/*<div className={pagestyles.barPartWrapper}>
                    <div className={pagestyles.steps}>
                        {(sectionIdx === 0) && (groupName === "pre") ? (
                          <>
                            <hr /><hr /><hr /><hr />
                          </>
                        ) : (sectionIdx === 0) && (groupName === "post") ? (
                          <>
                            <hr className={pagestyles.current} /><hr /><hr /><hr />
                          </>
                        ) : sectionIdx === 1 ? (
                          <>
                            <hr className={pagestyles.completed} /><hr className={pagestyles.current} /><hr /><hr />
                          </>
                        ) : sectionIdx === 2 ? (
                          <>
                            <hr className={pagestyles.completed} /><hr className={pagestyles.completed} /><hr className={pagestyles.current} /><hr />
                          </>
                        ) : (
                          <>
                            <hr className={pagestyles.completed} /><hr className={pagestyles.completed} /><hr className={pagestyles.completed} /><hr className={pagestyles.current} />
                          </>
                        )}
                    </div>
                    <h3>Configuration</h3>
                    <p>Not Started</p>
                </div>*/}
                
                      { groupName === "pre" ? (
                        <>
                          <div className={pagestyles.barPartWrapper}>
                            <div className={pagestyles.steps}>
                            <hr />
                            </div>
                          <h3>Configuration</h3>
                          <p>Not Started</p>
                      </div>
                        </>
                      ) : (
                        <>
                          <div className={pagestyles.barPartWrapper}>
                            <div className={pagestyles.steps}>
                              {allSections.map((section, ind) => {
                                let stepClass = 'step';
                                
                                if (ind < sectionIdx) {
                                  stepClass = pagestyles.completed;
                                } else if (ind === sectionIdx) {
                                  stepClass = pagestyles.current;
                                }
                                
                                return <hr key={ind} className={stepClass} />;
                              })}
                            </div>
                            <h3>Configuration</h3>
                            <p>Step {sectionIdx + 1} of {allSections.length}</p>
                          </div>
                        </>
                      )}
                      
                    
            </div>
        </div>
            

            
          <h2 className={pagestyles.header}>Configure Software</h2>
          <div className={pagestyles.content}>
            {sections[sectionIdx]}
            <div className={pagestyles.button_container}>
              <NavButton
                text="Go Back"
                id="back"
                arrow="left"
                enabled={true}
                onPress={() => {
                  // Update store on navigate
                  dispatch.bank.updateSection({
                    id: allSections[sectionIdx].name,
                    values: allSections[sectionIdx].data.questions.map(
                      (q, idx) => {
                        return { id: q.id, value: values[sectionIdx][idx] };
                      }
                    ),
                  });
                  // Get the previous section from the store
                  const prev = dispatch.controller.getPrevious(
                    allSections[sectionIdx].name
                  );
                  // Navigate to the previous section if it exists or just go back
                  !!prev
                    ? setIdx(allSections.findIndex((o) => o.name === prev))
                    : back();
                }}
              />
              <NavButton
                text="Continue"
                id="next"
                arrow="right"
                enabled={true}
                disabledTheme={!canSubmit}
                onPress={() => {
                  if (!canSubmit) {
                    setAttempted(true);
                    return;
                  }
                  // Update store on navigate
                  dispatch.bank.updateSection({
                    id: allSections[sectionIdx].name,
                    values: allSections[sectionIdx].data.questions.map(
                      (q, idx) => {
                        return { id: q.id, value: values[sectionIdx][idx] };
                      }
                    ),
                  });
                  // Get next section from store
                  const next = dispatch.controller.getNext(
                    allSections[sectionIdx].name
                  );
                  // Navigate to the next section or the next page if none exists
                  !!next
                    ? setIdx(allSections.findIndex((o) => o.name === next))
                    : push((idx) => idx + 1);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };
  return Page;
};

export default GroupBuilder;
