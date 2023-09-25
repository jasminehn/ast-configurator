// /*
//   utils.ts
//   Form utilities and algos
// */

import { QuestionV2, SelectQuestion, TextQuestion } from "./types";

/**
 * Given a question and a response, return what the response should be displayed to the user as.
 * @param question The question that was answered
 * @param response The response recorded by the form
 * @returns A string of the response.
 */
export const getAnswerString = (question: QuestionV2, response: string): string => {
  if (isText(question)) {
    return response;
  } else if (isSelect(question)) {
    return question.type === "select" ? (JSON.parse(response) as string[]).map(v => question.options.find(o => o.value === v)?.name ?? "N/A").join(", ") : question.options.find(o => o.value === response)?.name ?? "N/A"
  }
  return "err"
}

/*
  returns if the given question is a Select question
*/
export const isSelect = (object: any): object is SelectQuestion => {
  return (object.type === "radio") || 
  (object.type === "select") || 
  (object.type === "dropdown")
}

/*
  returns if the given question is a Text question
*/
export const isText = (object: any): object is TextQuestion => {
  return object.type === "text"
}

/*
  returns if a question is submittable given a value
*/
export const isSubmittable = (question: QuestionV2, response: string): boolean => {
  // Checking for required questions w/o responses
  if (!question.optional && (response == "")) {
    return false
  }
  if (isText(question)) {
    // Check constraint
    if (question.constraint) {
      return new RegExp(question.constraint).test(response)
    }
  }
  else if (isSelect(question)) {
    // Check if required for multiselect questions
    if (question.type === "select" && !question.optional) {
      return response != "[]"
    }
  }
  return true;
}