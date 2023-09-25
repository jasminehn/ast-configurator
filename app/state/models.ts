/**
 * models.ts
 * Definitions for Redux/Rematch state
 */
import { createModel, Models, RematchDispatch } from "@rematch/core";
import T from "prop-types";
import software from "../data/software.json";
import config from "../groups.config";
import { Condition } from "./types";
import { evalCondition } from "./utils";

// An array of all the sections within the application
const allSections = config.groups.map((group) => group.sections).flat();
// Controller questions w/ spliced IDs
const controllerQuestions = allSections
  .map((s) =>
    s.data.questions
      .filter((q) => q.controller)
      .map((q) => {
        return { ...q, id: s.name + "." + q.id };
      })
  )
  .flat();

// Used for initializing current sections, based off the default values of questions
export const testBaseCondition = (condition: Condition) => {
  const response: string | undefined = controllerQuestions.find(
    (q) => condition.question === q.id
  )?.default;
  if (response === undefined) {
    return false;
  }
  return evalCondition(condition, response);
};

// Used for initializing current sections within controller model
function getNextBase(id: string) {
  const group = config.groups.find((g) => g.name === id);
  if (group === undefined) {
    console.error("getNextBased failed, invalid group config");
    return undefined;
  }
  const remaining = group?.sections;
  // Would happen if an entire group is bypassed, ig.
  if (!remaining?.length) {
    return undefined;
  }
  for (const r of remaining) {
    if (
      r.data.conditions.reduce(
        (acc, cond) => acc && testBaseCondition(cond),
        true
      )
    ) {
      return r.name;
    }
  }
  return undefined;
}

interface IBankState {
  store: {
    id: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
}

// Lazy storage of all form questions, identified in {sectionId, values {questionId ...}} format
export const bank: any = createModel<RootModel>()({
  state: {
    store: allSections.map((s) => {
      return {
        id: s.name,
        values: s.data.questions.map((q) => {
          return { id: q.id, value: q.default ?? "" };
        }),
      };
    }),
  } as IBankState,
  reducers: {
    /** Given the section's id and values, update the bank */
    updateSection: (
      state,
      payload: { id: string; values: { id: string; value: string }[] }
    ): IBankState => {
      const { id, values } = payload;
      return {
        ...state,
        store: state.store.map((s: any) =>
          s.id === id ? { id: id, values: values } : s
        ),
      };
    },
  },
  // Debug typings for the state
  typings: {
    store: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        values: T.arrayOf(
          T.shape({ id: T.string.isRequired, value: T.string.isRequired })
            .isRequired
        ).isRequired,
      })
    ).isRequired,
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    // Given a section id, returns back its values
    getSection(payload: string, rootState: any) {
      const data: IBankState["store"][number] = rootState.bank.store.find(
        (o: IBankState["store"][number]) => o.id === payload
      );
      if (data === undefined) {
        console.error("Failure within getSection");
        return [];
      }
      return data.values.map((o) => o.value);
    },
    // Tests a condition against the current bank. Not as fast/reliable as testCondition within
    // the controller model but can be used for generic condition testing
    lazilyTestCondition(payload: Condition, rootState: any): boolean {
      const condition = payload;
      // If prefixed by _SELECT, then resolve using select reducer method
      const [sid, qid] = condition.question.split(".");
      if (sid === "_SELECT") {
        return dispatch.select.evalCondition({ condition }) as boolean;
      }
      const response: string | undefined = rootState.bank.store
        .find((o: IBankState["store"][number]) => o.id === sid)
        ?.values.find((v: { id: string; value: string }) => v.id === qid).value;
      if (response === undefined) {
        return false;
      }
      return evalCondition(condition, response);
    },
  }),
});

interface IControllerState {
  store: Array<{ id: string; value: string }>;
  // currents: Array<{ id: string; current: string }>;
}

// Up-to-date storage of controller questions, identified in Section.Question format
// Also holds the current section for each group
export const controller: any = createModel<RootModel>()({
  state: {
    store: controllerQuestions.map((q) => {
      return { id: q.id, value: q.default ?? "" };
    }),
    // currents: config.groups.map((g) => {
    //   return { id: g.name, current: getNextBase(g.name) };
    // }),
  } as IControllerState,
  reducers: {
    // Updates a question's value in the store.
    update: (state, payload: { id: string; value: string }) => {
      return {
        ...state,
        store: state.store.map((q) => (q.id === payload.id ? payload : q)),
      };
    },
    // Updates the current section for a group in the store
    // setCurrent(state, payload: { group: string; section: string }) {
    //   const { group, section } = payload;
    //   return {
    //     ...state,
    //     currents: state.currents.map((g) =>
    //       g.id === group ? { ...g, current: section } : g
    //     ),
    //   };
    // },
  },
  // Typings for debug
  //@ts-ignore
  typings: {
    store: T.arrayOf(
      T.shape({ id: T.string.isRequired, value: T.string.isRequired })
        .isRequired
    ).isRequired,
    // currents: T.arrayOf(
    //   T.shape({ id: T.string.isRequired, current: T.string }).isRequired
    // ).isRequired,
  },
  effects: (dispatch) => ({
    // Calculates the next section to go to given the current section
    getNext(section: string) {
      // Get current group
      const group = config.groups.find((g) =>
        g.sections.find((s) => s.name === section)
      );
      if (!group) {
        console.error("getNext failed, invalid group " + section);
        return undefined;
      }
      // Get group's sections
      const groupData = config.groups.find((g) =>
        g.sections.find((s) => s.name === section)
      )?.sections;
      // Get sections after current
      const remaining = groupData?.slice(
        groupData?.findIndex((s) => s.name === section) + 1
      );
      if (!remaining?.length) {
        return undefined;
      }
      // Test each section's conditions, returning it if all are true
      for (const r of remaining) {
        if (
          r.data.conditions.reduce((acc, cond) => {
            return (
              acc &&
              (dispatch.controller?.testCondition({
                condition: cond,
              }) as boolean)
            );
          }, true)
        ) {
          return r.name;
        }
      }
      return undefined;
    },
    // Calculates the section to go back to given the current section
    getPrevious(section: string) {
      // Get current group
      const group = config.groups.find((g) =>
        g.sections.find((s) => s.name === section)
      );
      if (group === undefined) {
        console.error("getPrevious failed, invalid group config");
      }
      // Get group's sections
      const groupData = group?.sections;
      const idx = groupData?.findIndex((s) => s.name === section);
      // Get sections before current, reversing for iteration
      const remaining = groupData?.slice(0, idx).reverse()
      if (!remaining?.length) {
        return undefined;
      }
      // Test each section's conditions, returning it if all are true
      for (const r of remaining) {
        if (
          r.data.conditions.reduce(
            (acc, cond) =>
              acc &&
              (dispatch.controller.testCondition({
                condition: cond,
              }) as boolean),
            true
          )
        ) {
          return r.name;
        }
      }
      return undefined;
    },
    // Tests a condition against the controller bank
    testCondition(payload: { condition: Condition }, rootState: any): boolean {
      const { condition } = payload;
      // If prefixed by _SELECT, then resolve using select reducer method
      const [sid, qid] = condition.question.split(".");
      if (sid === "_SELECT") {
        return dispatch.select.evalCondition({ condition }) as boolean;
      }
      const response: string | undefined = rootState.controller.store.find(
        (o: { id: string; value: string }) => o.id === condition.question
      ).value;
      if (response === undefined) {
        return false;
      }
      return evalCondition(condition, response);
    },
    getFirst(groupname: string) {
      // Get current group
      const group = config.groups.find((g) => g.name === groupname);
      if (!group) {
        console.error("getNext failed, invalid group " + groupname);
        return undefined;
      }
      // Get group's sections
      const groupData = group?.sections;
      // Get sections after current
      // Test each section's conditions, returning it if all are true
      for (const r of groupData) {
        if (
          r.data.conditions.reduce((acc, cond) => {
            return (
              acc &&
              (dispatch.controller?.testCondition({
                condition: cond,
              }) as boolean)
            );
          }, true)
        ) {
          return r.name;
        }
      }
      return undefined;
    },
    getLast(groupname: string) {
      // Get current group
      const group = config.groups.find((g) => g.name === groupname);
      if (!group) {
        console.error("getNext failed, invalid group " + groupname);
        return undefined;
      }
      // Get group's sections
      const groupData = group?.sections.slice().reverse()
      // Get sections after current
      // Test each section's conditions, returning it if all are true
      for (const r of groupData) {
        if (
          r.data.conditions.reduce((acc, cond) => {
            return (
              acc &&
              (dispatch.controller?.testCondition({
                condition: cond,
              }) as boolean)
            );
          }, true)
        ) {
          return r.name;
        }
      }
      return undefined;
    },
  }),
});

/** Model for keeping track of what software was selected */
export const select: any = createModel<RootModel>()({
  state: {
    store: software.software.map((s) => {
      return { id: s.id, state: undefined as boolean | undefined };
    }),
  },
  typings: {
    store: T.arrayOf(
      T.shape({ id: T.string.isRequired, state: T.bool }).isRequired
    ).isRequired,
  },
  reducers: {
    setSelected: (
      state,
      payload: { selected: { id: string; state: boolean | undefined }[] }
    ) => {
      return {
        ...state,
        store: payload.selected,
      };
    },
  },
  effects: (dispatch) => ({
    /** Gets if a software is selected by id */
    isSelected(payload: string, rootState) {
      return (
        rootState.select.store.find(
          (o: { id: string; state: boolean | undefined }) => o.id === payload
        )?.state ?? false
      );
    },
    /** Evaluates a condition that was prefixed by "_SELECT" */
    evalCondition(payload: { condition: Condition }, rootState) {
      const { condition } = payload;
      if (condition.is === "includes") {
        return !!rootState.select.store.find(
          (o: { id: string; state: boolean | undefined }) =>
            o.id === condition.to
        ).state;
      } else if (condition.is === "excludes") {
        return !rootState.select.store.find(
          (o: { id: string; state: boolean | undefined }) =>
            o.id === condition.to
        ).state;
      }
      return false;
    },
    /** Returns back a list of objects containing each software id and whether it is selected (or null)*/
    getSelected(payload: any, rootState) {
      return rootState.select.store.map(
        (o: { id: string; state: boolean | undefined }) => {
          return { ...o, state: o.state };
        }
      );
    },
  }),
});

export interface RootModel extends Models<RootModel> {
  bank: typeof bank;
  controller: typeof controller;
  select: typeof select;
}

export const models: RootModel = { bank, controller, select };
