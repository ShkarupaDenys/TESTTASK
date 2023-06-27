import { Link } from 'react-router-dom';
import { Logo } from 'views/icons';
import './HeaderLogo.scss';

export const HeaderLogo = () => (
  <Link
    to="/TESTTASK"
    className="HeaderLogo"
  >
    {}
    <Logo />
    <span className="HeaderLogo__name">TESTTASK</span>
  </Link>
);
