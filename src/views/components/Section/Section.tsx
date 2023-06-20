import { ReactNode, memo, FC } from 'react';
import './Section.scss';

interface Props {
  id?: string;
  title: string;
  className?: string;
  children: ReactNode;
}

export const Section: FC<Props> = memo(({
  title,
  id,
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
