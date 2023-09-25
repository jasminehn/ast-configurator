/**
 * FormResView.tsx
 * Given a section id and its data, show all the prompts and answers for that section.
 */

import { useDispatch } from "react-redux";
import { Dispatch } from "../../state/store";
import AnswerView from "../AnswerView/AnswerView";
import type { Section } from "../Section/types";
import { getAnswerString } from "../Section/utils";

interface FormResViewProps {
  id: string;
  data?: Section;
}

const FormResView = ({ id, data }: FormResViewProps) => {
  const dispatch = useDispatch<Dispatch>();

  // Get the Section's responses from the bank
  const values = dispatch.bank.getSection(id) as string[];

  if (!data) {
    return <div>error: no data provided</div>;
  }

  // Map questions to answers and render an AnswerView for each
  return (
    <div>
      {data.questions.map((q, idx) => (
        <AnswerView
          key={idx}
          prompt={q.prompt}
          answer={getAnswerString(q, values[idx])}
        />
      ))}
    </div>
  );
};

export default FormResView;
