import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Button } from "./Button";
import styles from "./Button.module.scss";

describe("Button", () => {
  test("renders children with default values and merges className", () => {
    render(<Button className="testing"></Button>);
    const button = screen.getByRole("button", { name: /button/i });
    expect(button).toHaveClass(styles.button, styles.primary, styles.md, "testing");
  });

  test("applies variant, size classes and different name", () => {
    render(<Button variant="ghost" size="lg">Go</Button>);
    const button = screen.getByRole("button", { name: "Go" });
    expect(button).toHaveClass(styles.ghost, styles.lg);
    expect(button).not.toHaveClass(styles.primary, styles.md);
  });

  test("renders a link when href is provided", () => {
    render(<Button href="#about">About</Button>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "#about");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("forwards onClick and disabled", () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Button disabled>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeDisabled();
  });
});