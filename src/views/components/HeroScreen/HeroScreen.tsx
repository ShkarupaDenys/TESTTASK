import { Button } from 'views/components';
import './HeroScreen.scss';

export const HeroScreen = () => (
  <section className="HeroScreen">
    <div
      className="
      HeroScreen__wrap
      container-sm
      text-center
      text-white
    "
    >
      <h1 className="HeroScreen__heading h1">
        Test assignment for front-end developer
      </h1>
      <p className="HeroScreen__sub-heading p1">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they&sbquo;ll be building web interfaces with accessibility
        in mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <Button content="Sign up" path="NewUserForm" />
    </div>
  </section>
);
