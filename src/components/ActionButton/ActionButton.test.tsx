import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ActionButton } from "./ActionButton";
import styles from "./ActionButton.module.scss";
import defaultIconUrl from "../../assets/default_icon.svg";

describe("ActionButton", () => {
    test("renders with default values", () => {
        render(<ActionButton iconAlt="Test Icon" className="testing" />);
        const button = screen.getByRole("button", { name: /test icon/i });
        expect(button).toHaveClass(styles.actionButton, styles.md, "default-shadow", "items-center", "justify-center", "cursor-pointer", "inline-flex", "bg-white", "testing");
        const imgElement = button.querySelector("img");
        expect(imgElement).toHaveAttribute("src", defaultIconUrl);
        expect(imgElement).toHaveAttribute("alt", "Test Icon");
    });

    test("renders with custom size and icon", () => {
        const customIconUrl = "https://example.com/custom-icon.svg";
        render(<ActionButton size="lg" icon={customIconUrl} iconAlt="Custom Icon" />);
        const button = screen.getByRole("button", { name: /custom icon/i });
        expect(button).toHaveClass(styles.actionButton, styles.lg);
        const imgElement = button.querySelector("img");
        expect(imgElement).toHaveAttribute("src", customIconUrl);
        expect(imgElement).toHaveAttribute("alt", "Custom Icon");
    });

    test("renders with aria-label when provided", () => {
        render(<ActionButton aria-label="Aria Label Test" />);
        const button = screen.getByRole("button", { name: /aria label test/i });
        expect(button).toBeInTheDocument();
    });

    test("renders with type attribute and additional props", () => {
        render(<ActionButton type="submit" data-testid="action-button" />);
        const button = screen.getByTestId("action-button");
        expect(button).toHaveAttribute("type", "submit");
    });

    test("renders with default icon when provided icon fails to load", () => {
        const brokenIconUrl = "https://example.com/broken-icon.svg";
        render(<ActionButton icon={brokenIconUrl} iconAlt="Broken Icon" />);
        const imgElement = screen.getByRole("img", { name: /broken icon/i });
        imgElement.dispatchEvent(new Event("error"));
        expect(imgElement).toHaveAttribute("src", defaultIconUrl);
    });

    test("reders with disabled attribute when provided", () => {
        render(<ActionButton disabled />);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });
});