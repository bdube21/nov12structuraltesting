import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
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
            Answer: {answerVisible && 42}
            <span>
                <Button onClick={toggleVisibility}>
                    Toggle Answer Visibility
                </Button>
            </span>
            <Button onClick={toggleHintVisibility}>
                Toggle Hint Visibility
            </Button>
            {answerHintVisible ?
                "hint: the answer to life, the universe, and everything"
            :   ""}
        </div>
    );
}
