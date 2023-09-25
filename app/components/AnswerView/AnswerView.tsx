/**
 * AnswerView.tsx
 * A cell containing a question and answer
 */

import styles from "./AnswerView.module.css";

interface AnswerViewProps {
  prompt: string;
  answer: string;
}

const AnswerView = ({ prompt, answer }: AnswerViewProps) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.h5}>{prompt}</h5>
      <p className={styles.answer}>{answer}</p>
    </div>
  );
};

export default AnswerView;
