import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import userEvent from "@testing-library/user-event";
import styles from "./Checkbox.module.scss";

describe("Checkbox", () => {
    test("renders with default values and classes", () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        const checkboxContainer = screen.getByTestId("checkbox-container");
        expect(checkboxContainer).toHaveClass(styles.checkbox, styles.md);
        expect(checkbox).not.toBeChecked();
    })

    test("check and uncheck on click", async () => {
        const user = userEvent.setup();

        render(<Checkbox />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        await user.click(checkbox);
        expect(checkbox).toBeChecked();

        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    test("renders with passed values and classes", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        render(<Checkbox size="lg" onChange={handleChange} label="checkbox test" className="testingClassName" boxClassName="testingBoxClassName" labelClassName="testinglabelClassName" />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        const checkboxContainer = screen.getByTestId("checkbox-container");
        expect(checkboxContainer).toHaveClass(styles.lg, "testingClassName")

        await user.click(checkbox);
        expect(handleChange).toHaveBeenCalledOnce();
        expect(checkbox).toBeChecked();

        const spanWithText = screen.getByText(/checkbox test/i);
        expect(spanWithText).toHaveClass(styles.label, "testinglabelClassName")
        const box = checkboxContainer.querySelector('[aria-hidden="true"]');
        expect(box).toHaveClass("testingBoxClassName", styles.box);
    });

    test("renders disabled when passed and is passing props", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Checkbox disabled id="requirements" onChange={handleChange} />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDisabled();
        expect(checkbox).toHaveAttribute("id", "requirements");

        await user.click(checkbox);
        expect(handleChange).not.toHaveBeenCalled();
    });

    test("renders w indeterminate as true", () => {
        render(<Checkbox indeterminate />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toHaveProperty("indeterminate", true);
    });
});
