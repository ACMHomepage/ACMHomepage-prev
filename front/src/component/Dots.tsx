import range from 'lodash/range';
import isUndefined from 'lodash/isUndefined';
import type { ThemeUICSSProperties } from 'theme-ui';

// Dot. Clickable. If the onClick function name is `a`, when we click it, it
// will call `a(index)`.
interface DotProps {
  index: number;
  current: number;
  size: ThemeUICSSProperties['size'];
  onClick?: () => void;
}

const Dot = ({ index, current, size, onClick }: DotProps) => {
  const active: boolean = index === current;

  return (
    <button
      sx={{
        bg: active ? 'gray.1' : 'gray.7',
        opacity: active ? 1 : 0.5,
        size,
        borderWidth: '1.5px',
        borderColor: active ? 'gray.7' : 'gray.3',
        borderRadius: 'inf',
      }}
      onClick={onClick}
    />
  );
};

// Dots. Clickable `Dot`s.
interface DotsProps {
  length: number;
  current: number;
  dotSize: ThemeUICSSProperties['size'];
  onClickFunction?: (index: number) => void;
  className?: string;
}

const Dots = (props: DotsProps) => {
  const { length, current, dotSize, onClickFunction, className } = props;

  return (
    <div
      sx={{
        display: 'flex',
        gap: '0.5rem',
      }}
      className={className}
    >
      {range(length).map((index) => (
        <Dot
          index={index}
          key={index}
          current={current}
          size={dotSize}
          onClick={
            isUndefined(onClickFunction)
              ? undefined
              : () => onClickFunction(index)
          }
        />
      ))}
    </div>
  );
};

export default Dots;
