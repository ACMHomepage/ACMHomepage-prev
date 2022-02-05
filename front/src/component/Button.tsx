import styled from 'styled-components';
import { variant, layout, position } from 'styled-system';

// Props:
// - withBorder. (boolean or undefined).
// - theme. ('primary' or 'secondary').
// - btnSize. ('sm', 'md'(default), 'lg').
// - styled-system's `layout`, `position`.
export default styled.button(
  {
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    height: '2rem',
  },
  ({ withBorder }: { withBorder: boolean | undefined }) => {
    if (!withBorder) return {};
    return { borderWidth: '1px' };
  },
  variant({
    prop: 'btnTheme',
    variants: {
      primary: {
        color: 'primary',
        bg: 'primaryBg',
        borderColor: 'primary',
        ':hover': {
          color: 'primaryBg',
          bg: 'primary',
        },
      },
      secondary: {
        color: 'secondary',
        bg: 'secondaryBg',
        borderColor: 'secondary',
        ':hover': {
          color: 'secondaryBg',
          bg: 'secondary',
        },
      },
    },
  }),
  variant({
    prop: 'btnSize',
    variants: {
      sm: {
        fontSize: '0.75rem',
        height: '1.5rem',
      },
      md: {},
      lg: {
        fontSize: '1rem',
        height: '2.5rem',
      },
    },
  }),
  layout,
  position,
);
