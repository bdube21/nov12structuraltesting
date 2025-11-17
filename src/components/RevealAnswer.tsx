import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface RevealAnswerProps {
    answer: string;
    hint: string;
}

export function RevealAnswer(props: RevealAnswerProps): React.JSX.Element {
    const [answerVisible, setanswerVisible] = useState<boolean>(false);
    const [answerHintVisible, setanswerHintVisible] = useState<boolean>(false);

    function toggleVisibility() {
        if (answerVisible) {
            setanswerVisible(false);
        } else {
            setanswerVisible(true);
        }
    }
    function toggleHintVisibility() {
        if (answerHintVisible) {
            setanswerHintVisible(false);
        } else {
            setanswerHintVisible(true);
        }
    }

    return (
        <div>
            Answer: {answerVisible && props.answer}
            <span>
                <Button onClick={toggleVisibility}>
                    Toggle Answer Visibility
                </Button>
            </span>
            <Button onClick={toggleHintVisibility}>
                Toggle Hint Visibility
            </Button>
            {answerHintVisible ? "hint: " + props.hint : ""}
        </div>
    );
}
