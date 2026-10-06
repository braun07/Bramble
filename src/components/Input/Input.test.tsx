import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Input } from "./Input";
import styles from "./Input.module.scss";

describe("Input", () => {
    test("render with default values when nothing is passed", () => {
        render(<Input />);
        const inputElement = screen.getByTestId("input-wrapper");
        expect(inputElement).toHaveClass(styles.md);

        const labelElement = screen.getByTestId("input-container").querySelector("label");
        expect(labelElement).not.toBeInTheDocument();

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "false");
        expect(input).not.toHaveAttribute("aria-describedby");

        const leftElement = screen.queryByTestId("input-leftElement");
        expect(leftElement).not.toBeInTheDocument();

        const rightElement = screen.queryByTestId("input-rightElement");
        expect(rightElement).not.toBeInTheDocument();

        const errorElement = screen.queryByTestId("input-error");
        expect(errorElement).not.toBeInTheDocument();

        const helperElement = screen.queryByTestId("input-helper");
        expect(helperElement).not.toBeInTheDocument();
    });

    test("render with all passed values on Element", () => {
        render(
            <Input
                id="test-input"
                label="Test Input"
                error="Error message"
                size="lg"
                fullWidth={true}
                leftElement={<span>Left</span>}
                rightElement={<span>Right</span>}
                className="custom-class"
                disabled={true}
                required={true}
                labelClass="custom-label-class"
            />
        );

        const containerElement = screen.getByTestId("input-container");
        expect(containerElement).toHaveClass(styles.fullWidth);

        const inputElement = screen.getByTestId("input-wrapper");
        expect(inputElement).toHaveClass(styles.lg);
        expect(inputElement).toHaveClass(styles.error);
        expect(inputElement).toHaveClass(styles.disabled);

        const labelElement = screen.getByText("Test Input");
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveClass("custom-label-class");

        const leftElement = screen.getByTestId("input-leftElement");
        expect(leftElement).toBeInTheDocument();
        expect(leftElement).toHaveTextContent("Left");

        const rightElement = screen.getByTestId("input-rightElement");
        expect(rightElement).toBeInTheDocument();
        expect(rightElement).toHaveTextContent("Right");

        const errorElement = screen.getByText("Error message");
        expect(errorElement).toBeInTheDocument();

        const asteriskElement = screen.getByText("*");
        expect(asteriskElement).toBeInTheDocument();
    });

    test("render with helper text when passed", () => {
        render(<Input helperText="Helper text" />);
        const helperElement = screen.getByText("Helper text");
        expect(helperElement).toBeInTheDocument();
    });

    test("render placeholder when passed", () => {
        render(<Input placeholder="Enter text" />);
        const inputElement = screen.getByPlaceholderText("Enter text");
        expect(inputElement).toBeInTheDocument();
    });

    test("links the label to the input using the passed id", () => {
        render(<Input id="formName" label="What is your form name?" required />);

        const input = screen.getByLabelText(/what is your form name/i);
        expect(input).toHaveAttribute("id", "formName");
        expect(input).toBeRequired();
        expect(screen.getByText("*")).toHaveClass(styles.required);
    });

    test("links the label to the input using the generated id", () => {
        render(<Input label="Email" />);

        const input = screen.getByLabelText("Email");
        expect(input.id).not.toBe("");
        expect(screen.getByText("Email")).toHaveAttribute("for", input.id);
    });

    test.each(["sm", "md", "lg"] as const)("applies the %s size class", (size) => {
        render(<Input size={size} />);
        expect(screen.getByTestId("input-wrapper")).toHaveClass(styles[size]);
    });

    test("applies className to the container, not the input", () => {
        render(<Input className="custom-class" />);

        expect(screen.getByTestId("input-container")).toHaveClass("custom-class");
        expect(screen.getByRole("textbox")).not.toHaveClass("custom-class");
    });

    test("disables the input when disabled is passed", () => {
        render(<Input disabled />);

        expect(screen.getByRole("textbox")).toBeDisabled();
        expect(screen.getByTestId("input-wrapper")).toHaveClass(styles.disabled);
    });

    test("adds spacing classes for left and right elements", () => {
        render(<Input leftElement={<span>Left</span>} rightElement={<span>Right</span>} />);

        const wrapper = screen.getByTestId("input-wrapper");
        expect(wrapper).toHaveClass(styles.hasLeftElement);
        expect(wrapper).toHaveClass(styles.hasRightElement);
    });

    test("describes the input with the helper text", () => {
        render(<Input id="name" helperText="Helper text" />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-describedby", "name-helper");
        expect(input).toHaveAttribute("aria-invalid", "false");
        expect(screen.getByTestId("input-helper")).toHaveAttribute("id", "name-helper");
    });

    test("shows the error instead of the helper text and marks the input invalid", () => {
        render(<Input id="name" error="Name is required" helperText="Helper text" />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby", "name-error");
        expect(screen.getByTestId("input-error")).toHaveAttribute("id", "name-error");
        expect(screen.queryByTestId("input-helper")).not.toBeInTheDocument();
    });

    test("hides the error when the error prop is cleared", () => {
        const { rerender } = render(<Input error="Name is required" helperText="Helper text" />);

        rerender(<Input helperText="Helper text" />);

        expect(screen.queryByTestId("input-error")).not.toBeInTheDocument();
        expect(screen.getByTestId("input-helper")).toBeInTheDocument();
        expect(screen.getByTestId("input-wrapper")).not.toHaveClass(styles.error);
    });
});