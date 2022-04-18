import classNames from 'classnames';

import styles from './styles/Dot.module.scss';

// Dot. Clickable. If the onClick function name is `a`, when we click it, it
// will call `a(index)`.
interface DotProps {
  index: number;
  current: number;
  onClick?: () => void;
}

const Dot = ({ index, current, onClick }: DotProps) => {
  const active: boolean = index === current;

  return (
    <button
      onClick={onClick}
      className={classNames(styles.Dot, active ? styles.current : null)}
    />
  );
};

export default Dot;
