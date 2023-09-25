/*
    types.ts
    types for interacting with forms
*/

import { Condition } from "../../state/types";

/** A section to display to the user containing multiple questions */
// notes: it would be really nice if for a section, there is an explanation for why you are on that section and a link to go back to the question that enabled it
export interface Section {
    questions: QuestionV2[];
    conditions: Condition[];
}

/** All the valid types of questions */
export type QuestionType = "text" | "select" | "radio" | "dropdown"

/** The general interface for a Question within a section */
export interface QuestionV2 {
    /** An ID for the question, unique to the section */
    id: string
    /** The type of question, restricted to "text", "select", "radio", and "dropdown" */
    type: QuestionType
    /** The prompt to display to the user */
    prompt: string
    /** A flag for if the state of this question needs to be watched for Section conditions */
    controller: boolean
    /** A flag for if this question is optional. */
    optional: boolean
    /** An optional default value to provide */
    default?: string
    /** A help string to show on hover, may include a link to AST Quickstart Guide */
    help?: string
}

/** A question of type "text" that displays a text input box */
export interface TextQuestion extends QuestionV2 {
    /** A regex string to match for text questons */
    constraint?: string
    /** The placeholder suggestion to display within the text input */
    placeholder: string
    /** The error string to display if constraint isn't matched */
    error?: string
}

/** A question of type "select", "radio", or "dropdown", with one or more selectable options */
export interface SelectQuestion extends QuestionV2 {
    /** The options to display for select and radio questions */
    options: Array<Option>
}

/** A selectable option within a SelectQuestion */
export interface Option {
    /** The text to display to the user */
    name: string;
    /** The value submitted to the application if this option is selected */
    value: string;
}
