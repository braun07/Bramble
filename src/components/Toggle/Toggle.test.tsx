import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";
import styles from "./Toggle.module.scss";
import { createRef } from "react";

describe("Toggle", () => {
    test("renders with default values and class when passed", () => {
        render(<Toggle className="testing" />);
        const button = screen.getByRole("switch");
        expect(button).toHaveClass(styles.toggle, styles.md, "default-shadow", "relative", "cursor-pointer", "testing");
        expect(button).toHaveAttribute("aria-checked", "false");
        expect(button).not.toHaveClass(styles.on);
    });

    test("renders with custom size and checked state", () => {
        render(<Toggle size="lg" checked />);
        const button = screen.getByRole("switch");
        expect(button).toHaveClass(styles.toggle, styles.lg, styles.on);
        expect(button).toHaveAttribute("aria-checked", "true");
    });

    test("calls onChange and onClick when clicked", async () => {
        const user = userEvent.setup();

        const handleChange = vi.fn();
        const handleClick = vi.fn();
        render(<Toggle onChange={handleChange} onClick={handleClick} />);
        const button = screen.getByRole("switch");
        await user.click(button);
        expect(handleChange).toHaveBeenCalledWith(true);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("does not call onChange and onClick when disabled", async () => {
        const user = userEvent.setup();

        const handleChange = vi.fn();
        const handleClick = vi.fn();
        render(<Toggle onChange={handleChange} onClick={handleClick} disabled />);
        const button = screen.getByRole("switch");
        await user.click(button);
        expect(handleChange).not.toHaveBeenCalled();
        expect(handleClick).not.toHaveBeenCalled();
    });

    test("renders with defaultChecked state", () => {
        render(<Toggle defaultChecked />);
        const button = screen.getByRole("switch");
        expect(button).toHaveAttribute("aria-checked", "true");
    });

    test("toggles state when clicked in uncontrolled mode", async () => {
        const user = userEvent.setup();

        render(<Toggle />);
        const button = screen.getByRole("switch");
        expect(button).toHaveAttribute("aria-checked", "false");
        await user.click(button);
        expect(button).toHaveAttribute("aria-checked", "true");
        await user.click(button);
        expect(button).toHaveAttribute("aria-checked", "false");
    });

    test("applies thumbClassName to the thumb element", () => {
        render(<Toggle thumbClassName="thumb-testing" />);
        const button = screen.getByRole("switch");
        const thumb = button.querySelector(`.${styles.thumb}`);
        expect(thumb).toHaveClass("thumb-testing");
    });

    test("forwards ref to the button", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<Toggle aria-label="Dark mode" ref={ref} />);
        expect(ref.current).toBe(screen.getByRole("switch"));
    });
});