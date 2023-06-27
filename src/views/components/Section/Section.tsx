import { FC, memo } from 'react';
import './Section.scss';
import { SectionProps } from 'types';

export const Section: FC<SectionProps> = memo(({
  id,
  title,
  children,
  className,
}) => (
  <section className={className} id={id}>
    <div className="container">
      <h2 className="Section-heading">
        {title}
      </h2>
      {children}
    </div>
  </section>
));
