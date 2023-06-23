import { Button, HeaderLogo } from 'views/components';
import './Header.scss';

export const Header = () => (
  <header className="Header">
    <div className="container Header__wrap">
      <HeaderLogo />
      <div className="Header__actions">
        <Button content="Users" path="Users" />
        <Button content="Sign up" path="NewUserForm" />
      </div>
    </div>
  </header>
);
