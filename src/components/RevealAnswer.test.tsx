import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import { RevealAnswer } from "./RevealAnswer";

export function expectAnswerIsPresent(shouldBeThere: boolean): void {
    let answerText = screen.queryByText(/42/);
    if (shouldBeThere) expect(answerText).toBeInTheDocument();
    else expect(answerText).toBeNull();
}

export function expectHintIsPresent(shouldBeThere: boolean): void {
    let hintText = screen.queryByText(
        /the answer to life, the universe, and everything/i,
    );
    if (shouldBeThere) expect(hintText).toBeInTheDocument();
    else expect(hintText).toBeNull();
}

describe("Reveal Answer", () => {
    beforeEach(() => {
        render(
            <RevealAnswer
                answer="42"
                hint="the answer to life, the universe, and everything"
            />,
        );
    });

    test("Answer field is shown", () => {
        // We use `getByText` because the text MUST be there
        const answerFieldName = screen.getByText(/Answer:/i);
        expect(answerFieldName).toBeInTheDocument();
    });

    test("Answer is not initially shown", () => {
        expectAnswerIsPresent(false);
    });

    // Click "Toggle Answer Visibility" button

    test("There is initially not Toggle Answer Visibility button", () => {
        const toggleAnswerButton = screen.queryByRole("button", {
            name: /Toggle Answer Visibility/i,
        });
        expect(toggleAnswerButton).not.toBeInTheDocument();
    });

    // Click Toggle Answer Visibility button, system shows answer
    test("Click Toggle Answer Visibility button, system shows answer", async () => {
        const toggleAnswerButton = screen.getByRole("button", {
            name: /Toggle Answer Visibility/i,
        });
        await act(async () => {
            toggleAnswerButton.click();
        });
        //system shows answer
        expectAnswerIsPresent(true);
    });

    // Click Toggle Answer Visibility button, system shows answer
    test("Click Toggle Answer Visibility button, click answer button again, system hides answer", async () => {
        const toggleAnswerButton = screen.getByRole("button", {
            name: /Toggle Answer Visibility/i,
        });
        await act(async () => {
            toggleAnswerButton.click();
        });
        await act(async () => {
            toggleAnswerButton.click();
        });

        //system hides answer
        expectAnswerIsPresent(false);

        // answer button still there
        // only testing this because this component changes visibility
        // so an easy bug would be hiding too much on the page
        expect(toggleAnswerButton).toBeVisible();
    });

    // Toggle hint button is present
    test("There is a Toggle Hint button", () => {
        const toggleHintButton = screen.getByRole("button", {
            name: /Toggle hint/i,
        });
        expect(toggleHintButton).toBeInTheDocument();
    });

    // Click Toggle Hint button, system shows hint
    test("Click Toggle Hint, system shows hint", async () => {
        const toggleHintButton = screen.getByRole("button", {
            name: /Toggle hint/i,
        });
        await act(async () => {
            toggleHintButton.click();
        });
        //system shows answer
        expectHintIsPresent(true);
    });

    // Click Toggle Hint twice, hint is hidden again
    test("Click Toggle Hint button, click toggle hint again, system hides hint", async () => {
        const toggleHintButton = screen.getByRole("button", {
            name: /Toggle hint/i,
        });
        await act(async () => {
            toggleHintButton.click();
        });
        await act(async () => {
            toggleHintButton.click();
        });

        //system hides answer
        expectHintIsPresent(false);

        // answer button still there
        // only testing this because this component changes visibility
        // so an easy bug would be hiding too much on the page
        expect(toggleHintButton).toBeVisible();
    });
});
