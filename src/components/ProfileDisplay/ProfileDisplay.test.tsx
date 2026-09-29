import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ProfileDisplay } from "./ProfileDisplay";
import styles from './ProfileDisplay.module.scss';
import defaultAvatarImg from '../../assets/default_avatar.jpg';

const testImg = "https://mockmind-api.uifaces.co/content/human/222.jpg";
const brokenImage = "https://example.invalid/no-such-image.png";

describe("Profile Display", () => {
    test("Profile Display Loads With default Values", () => {
        render(<ProfileDisplay />);

        const imgElement = screen.getByRole("img", { name: /user profile photo/i });
        expect(imgElement).toHaveAttribute("src", defaultAvatarImg);

        expect(screen.getByText("Welcome!")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();

        expect(imgElement).toHaveClass(styles.md);
    });

    test("Profile Display with provided values", () => {
        render(<ProfileDisplay photoUrl={testImg} welcomeMessage="Bem Vindo!" userName="João Braun" size="lg" className="bg-red" />);

        const imgElement = screen.getByRole("img", { name: /user profile photo/i });
        expect(imgElement).toHaveAttribute("src", testImg);

        expect(screen.getByText(/bem vindo!/i)).toBeInTheDocument();
        expect(screen.getByText(/joão braun/i)).toBeInTheDocument();

        expect(imgElement).toHaveAttribute("width", "80");

        const container = screen.getByTestId("profile-container");
        expect(container).toHaveClass("bg-red");
    });

    test("profile display with wrong inputed image and sm size", () => {
        render(<ProfileDisplay photoUrl={brokenImage} />)
        const imgElement = screen.getByRole("img", {name: /user profile photo/i});
        fireEvent.error(imgElement);
        expect(imgElement).toHaveAttribute("src", defaultAvatarImg);
    })
})