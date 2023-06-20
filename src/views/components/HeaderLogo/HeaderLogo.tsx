import { Logo } from "views/icons/Logo";
import './HeaderLogo.scss'

export const HeaderLogo = () => (
  <a href="/" className="HeaderLogo">
    <Logo />
    <span className="HeaderLogo__name">TESTTASK</span>
  </a>
);
