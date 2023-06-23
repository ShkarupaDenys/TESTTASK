import { Logo } from 'views/icons';
import './HeaderLogo.scss';

export const HeaderLogo = () => (
  <a
    href="https://shkarupadenys.github.io/TESTTASK/"
    className="HeaderLogo"
  >
    <Logo />
    <span className="HeaderLogo__name">TESTTASK</span>
  </a>
);
