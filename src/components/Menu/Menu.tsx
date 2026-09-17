import heroImg from '../../assets/bramble.svg';
import home from '../../assets/home.svg';
import components from '../../assets/components.svg';
import contact from '../../assets/contact.svg';
import { Button } from '../index.ts';

export type MenuProps = {
    onTranslate: () => void;
};

export function Menu({ onTranslate }: MenuProps) {
    return (
        <nav className="flex items-center justify-between w-100 px-30 md:px-60 xxl:px-120 py-30 fixed top-0 bg-blur index-2">
            <div className="flex gap-20 items-center">
                <img src={heroImg} className="menu-icon" width="49" height="63" alt="Logo" />
                <span className="text-40 fw-700 hidden md:flex">Bramble</span>
            </div>

            <div className="flex gap-30 sm:gap-100 items-center">
                <ul className="menu-links flex gap-20 sm:gap-40 items-center">
                    <li>
                        <a href="#home" className="flex"><img src={home} className="menu-nav-icon" width="39" height="29" alt="Home" /></a>
                    </li>
                    <li>
                        <a href="#components" className="flex"><img src={components} className="menu-nav-icon" width="29" height="29" alt="Components" /></a>
                    </li>
                    <li>
                        <a href="#contact" className="flex"><img src={contact} className="menu-nav-icon" width="29" height="29" alt="Contact" /></a>
                    </li>
                </ul>

                <Button
                    type="button"
                    className="px-10 py-5 sm:px-20 sm:py-10 rounded-10 w-fit h-fit fw-300 text-20 text-primary bg-base-1 border-bramble border-2 border-solid"
                    onClick={onTranslate}
                >
                    PT
                </Button>
            </div>
        </nav>
    );
}