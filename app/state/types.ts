/** A condition to evaluate against a qusetion's response */
export interface Condition {
  /** The question, in format {section.id}.{question.id} (or _SELECT)*/
    question: string
    /** A valid conditional operator (==, "includes", "excludes")  */
    is: string
    /** The value to evaluate against */
    to: string
  }
