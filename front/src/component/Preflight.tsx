import { Global } from '@emotion/react';
import type { Theme } from 'theme-ui';

/**
 * tailwindcss's preflight style.
 * @see {@link https://tailwindcss.com/docs/preflight}.
 *
 * Mount to set the style auto.
 */
export default () => (
  <Global
    /* @ts-ignore */
    styles={(theme: Theme) => ({
      '*': {
        fontFamily: 'inherit',
        transitionProperty:
          'color, background-color, border-color, ' +
          'text-decoration-color, fill, stroke, opacity, box-shadow, ' +
          'transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
      },
      'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
        margin: 0,
      },
      'h1, h2, h3, h4, h5, h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
      },
      'ol, ul': {
        listStyle: 'none',
        margin: 0,
        padding: 0,
      },
      'img, svg, video, canvas, audio, iframe, embed, object': {
        display: 'block',
        verticalAlign: 'middle',
      },
      '*, ::before, ::after': {
        borderWidth: 0,
        borderStyle: 'solid',
      },
      a: {
        textDecoration: 'underline 2px transparent',
        color: theme.colors!['link'],
        cursor: 'pointer',
        '&:hover': {
          textDecorationColor: theme.colors!['link'],
          color: theme.colors!['link'],
        },
      },
    })}
  />
);


