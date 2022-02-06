import React from 'react';
import styled from 'styled-components';
import { position, PositionProps, flexbox, FlexboxProps, layout, LayoutProps } from 'styled-system';
import range from 'lodash/range';
import isUndefined from 'lodash/isUndefined';

// Dot. Clickable. If the onClick function name is `a`, when we click it, it
// will call `a(index)`.
interface DotProps {
  index: number;
  current: number;
  onClick?: () => void;
}

const Dot = styled.button<DotProps & LayoutProps>((props) => {
  const active: boolean = props.index === props.current;
  const { colors, radii } = props.theme;

  return {
    background: colors[active ? 'gray-100' : 'gray-800'],
    opacity: active ? 1 : 0.5,
    borderRadius: radii['inf'],
    borderWidth: '1px',
    borderColor: colors[active ? 'gray-800' : 'gray-300'],
  };
}, layout);

// Dots. Clickable `Dot`s.
interface DotsProps {
  length: number;
  current: number;
  dotSize: number | string | object | (number | string)[];
  onClickFunction?: (index: number) => void;
}

const Dots = styled(({
  length,
  current,
  dotSize,
  onClickFunction,
  className,
}: DotsProps & { className?: string }) => (
  <div className={className}>
    {range(length).map((index) => (
      <Dot
        index={index}
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
))<DotsProps & PositionProps & FlexboxProps & LayoutProps>(
  {
    display: 'flex',
    gap: '0.5rem',
  },
  position,
  flexbox,
  layout,
);

export default Dots;
