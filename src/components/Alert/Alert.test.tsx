import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Alert } from "./Alert";
import styles from "./Alert.module.scss";

describe("Alert", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("renders an alert with the message and default values", () => {
    vi.useFakeTimers();
    const { container } = render(<Alert className="testClass" />);
    const AlertElement = screen.getByRole("alert");
    expect(AlertElement).toHaveClass(styles.info, "testClass");
    expect(AlertElement).toHaveTextContent(/this is an alert/i);
    expect(container.querySelector("img")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /dismiss alert/i }));

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("verify if img is displayed when passed", () => {
    render(<Alert icon="../../assets/bramble.svg" />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute("src", "../../assets/bramble.svg");
  });

  test.each(["success", "warning", "danger"] as const)(
    "applies the %s variant class",
    (variant) => {
      render(<Alert variant={variant} />)
      const AlertElement = screen.getByRole("alert");
      expect(AlertElement).toHaveClass(styles[variant]);
    },
  );

  test("dismissible doesnt appear on the document when its false", () => {
    const { container } = render(<Alert dismissible={false} />);
    expect(container.querySelector("button")).not.toBeInTheDocument();
  });

  test("comes back 3 seconds after dismiss when timeOut is set", () => {
    vi.useFakeTimers();
    render(<Alert timeOut />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss alert/i }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("forwards extra props and prints message", () => {
    render(<Alert id="info_alert" message="This is a info alert" />);
    const AlertElement = screen.getByRole("alert");
    expect(AlertElement).toHaveAttribute("id", "info_alert");
    expect(AlertElement).toHaveTextContent("This is a info alert");
  });
});
