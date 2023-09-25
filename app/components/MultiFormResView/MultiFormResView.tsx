/**
 * MultiFormResView.tsx
 * Given a list of sections and some data, show all the prompts and answers for those sections.
 */

import FormResView from "../FormResView/FormResView";
import type { Section } from "../Section/types";

interface MultiFormResViewProps {
  data: { name: string; data: Section }[];
}

const MultiFormResView = ({ data }: MultiFormResViewProps) => {
  return (
    <div>
      {data.map((o, idx) => (
        <FormResView key={idx} data={o.data} id={o.name} />
      ))}
    </div>
  );
};

export default MultiFormResView;
