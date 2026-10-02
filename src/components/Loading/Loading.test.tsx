import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Loading } from "./Loading";
import styles from "./Loading.module.scss";

describe("Loading", () => {
    test("renders with default values", () => {
        render(<Loading className="testing" />);
        const svgElement = screen.getByRole("img", { hidden: true });
        expect(svgElement).toHaveClass(styles.loadingSpinner, "testing");
        expect(svgElement).toHaveAttribute("width", "45");
        expect(svgElement).toHaveAttribute("height", "45");
        expect(svgElement.querySelectorAll("circle")[0]).toHaveAttribute("stroke", "#ffffff");
        expect(svgElement.querySelectorAll("circle")[1]).toHaveAttribute("stroke", "#d6284e");
        expect(svgElement.querySelectorAll("circle")[0]).toHaveAttribute("stroke-width", "8");
        expect(svgElement.querySelectorAll("circle")[1]).toHaveAttribute("stroke-width", "8");
    });
});

test("renders with custom values", () => {
    render(
        <Loading
            size={60}
            borderWidth={10}
            colorMain="#ff0000"
            colorBackground="#00ff00"
            ratio={0.5}
            className="custom-class"
        />
    );
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toHaveClass(styles.loadingSpinner, "custom-class");
    expect(svgElement).toHaveAttribute("width", "60");
    expect(svgElement).toHaveAttribute("height", "60");
    expect(svgElement.querySelectorAll("circle")[0]).toHaveAttribute("stroke", "#00ff00");
    expect(svgElement.querySelectorAll("circle")[1]).toHaveAttribute("stroke", "#ff0000");
    expect(svgElement.querySelectorAll("circle")[0]).toHaveAttribute("stroke-width", "10");
    expect(svgElement.querySelectorAll("circle")[1]).toHaveAttribute("stroke-width", "10");
});

test("renders with right ratio", () => {
    render(<Loading ratio={0.75} />);
    const svgElement = screen.getByRole("img", { hidden: true });
    const circles = svgElement.querySelectorAll("circle");
    const radius = (45 - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const primaryLength = circumference * 0.75;

    expect(circles[1]).toHaveAttribute("stroke-dasharray", `${primaryLength} ${circumference}`);
});

test("doesnt render with wrong ratio value (greater than 1)", () => {
    render(<Loading ratio={1.5} />);
    const svgElement = screen.getByRole("img", { hidden: true });
    const circles = svgElement.querySelectorAll("circle");
    const radius = (45 - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const primaryLength = circumference * 1;

    expect(circles[1]).toHaveAttribute("stroke-dasharray", `${primaryLength} ${circumference}`);
});

test("doesnt render with wrong ratio value (less than 0)", () => {
    render(<Loading ratio={-0.5} />);
    const svgElement = screen.getByRole("img", { hidden: true });
    const circles = svgElement.querySelectorAll("circle");
    const radius = (45 - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const primaryLength = circumference * 0;

    expect(circles[1]).toHaveAttribute("stroke-dasharray", `${primaryLength} ${circumference}`);
});

test("doesnt render with wrong borderWidth value (less than 1)", () => {
    render(<Loading borderWidth={0} />);
    const svgElement = screen.getByRole("img", { hidden: true });
    const circles = svgElement.querySelectorAll("circle");

    expect(circles[0]).toHaveAttribute("stroke-width", "1");
    expect(circles[1]).toHaveAttribute("stroke-width", "1");
});

test("doesnt render with wrong size value (less than 10)", () => {
    render(<Loading size={5} />);
    const svgElement = screen.getByRole("img", { hidden: true });

    expect(svgElement).toHaveAttribute("width", "10");
    expect(svgElement).toHaveAttribute("height", "10");
});

test("doesnt render with wrong colorMain and colorBackground values (not hex)", () => {
    render(<Loading colorMain="invalid" colorBackground="invalid" />);
    const svgElement = screen.getByRole("img", { hidden: true });
    const circles = svgElement.querySelectorAll("circle");

    expect(circles[0]).toHaveAttribute("stroke", "#ffffff");
    expect(circles[1]).toHaveAttribute("stroke", "#d6284e");
});