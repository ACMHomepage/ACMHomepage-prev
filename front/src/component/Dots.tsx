import range from 'lodash/range';
import { isUndefined, merge } from 'lodash';
import type { ThemeUICSSProperties } from 'theme-ui';
import {
  bg,
  size,
  border,
  effect,
  flexbox,
  layout,
} from '@acm-homepage/theme-shortcut';

// Dot. Clickable. If the onClick function name is `a`, when we click it, it
// will call `a(index)`.
interface DotProps {
  index: number;
  current: number;
  size: string | number;
  onClick?: () => void;
}

const Dot = ({ index, current, size: sz, onClick }: DotProps) => {
  const active: boolean = index === current;

  return (
    <button
      sx={merge(
        bg({ col: active ? 'gray.1' : 'gray.7' }),
        size({ w: sz, h: sz }),
        border({ width: '1px', col: `gray.${active ? 7 : 3}`, radius: 'inf' }),
        effect({ opacity: active ? 1 : 0.5 }),
      )}
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
      sx={merge(layout({ display: 'flex' }), flexbox({ gap: '0.5rem' }))}
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
