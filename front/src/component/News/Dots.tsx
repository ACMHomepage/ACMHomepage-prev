import range from 'lodash/range';
import classNames from 'classnames';

import Dot from './Dot';

import styles from './styles/Dots.module.scss';

// Dots. Clickable `Dot`s.
interface DotsProps {
  length: number;
  current: number;
  onClickFunction?: (index: number) => void;
  className?: string;
}

const Dots = (props: DotsProps) => {
  const { length, current, onClickFunction, className } = props;

  return (
    <div className={classNames(className, styles.Dots)}>
      {range(length).map((index) => (
        <Dot
          index={index}
          key={index}
          current={current}
          onClick={
            onClickFunction === undefined
              ? undefined
              : () => onClickFunction(index)
          }
        />
      ))}
    </div>
  );
};

export default Dots;
