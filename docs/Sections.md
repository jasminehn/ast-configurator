# Sections

A Section is a set of questions that is conditionally displayed within a Group. In the current version of this tool, each section is defined in its own file and groups are composed within `groups.config.ts`.

Each section is a JSON object that holds an array of `questions` and an array of `conditions`. Each question should be formatted as shown in `app/src/components/Section/types.ts`.

```typescript
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
```

Each condition should be formatted as defined in `app/src/state/types.ts`:

```typescript
/** A condition to evaluate against a qusetion's response */
export interface Condition {
  /** The question, in format {section.id}.{question.id} (or _SELECT)*/
    question: string
    /** A valid conditional operator (==, "includes", "excludes")  */
    is: string
    /** The value to evaluate against */
    to: string
  }

```

`_SELECT` is a special condition target that can query from the software chosen in the `select` screen. This may be useful for conditionally showing sections related to certain application deployment.

Sections are only rendered if every condition within `conditions` is met. If a question is going to be referenced within any `Condition`, its `controller` field should be set to `true` so the application tracks its state correctly.
