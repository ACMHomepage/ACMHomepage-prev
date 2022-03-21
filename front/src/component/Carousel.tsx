import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { merge } from 'lodash';
import {
  text,
  bg,
  size,
  border,
  layout,
  flexbox,
  trans,
  spacing,
} from '@acm-homepage/theme-shortcut';

import Button from './Button';
import Dots from './Dots';

import { mRV } from '../util/theme';
import type { BreakpointNameWithoutInit } from '../util/theme';

/*
 * Carousel's picture preview. Will show the content's picture and can change
 * the current index of content.
 */
interface CarouselPreviewProps {
  rowChangeBreakPoint: BreakpointNameWithoutInit;
  image_url: string;
  current: number;
  length: number;
  setCurrent: (current: number) => void;
}

const CarouselPreview = (props: CarouselPreviewProps) => {
  const { rowChangeBreakPoint, image_url, length, current, setCurrent } = props;
  return (
    <div
      sx={merge(
        layout({ pos: 'relative' }),
        size({
          w: mRV({ _: '100%', [rowChangeBreakPoint]: `${(100 * 2) / 3}%` }),
          h: mRV({ _: `${(100 * 3) / 5}%`, [rowChangeBreakPoint]: '100%' }),
        }),
      )}
    >
      <img
        src={image_url}
        sx={merge(
          size({ w: '100%', h: '100%' }),
          bg({ col: 'green.5' }),
          border({
            radius: {
              tl: mRV({ _: '0.25rem', [rowChangeBreakPoint]: '0rem' }),
              tr: '0.25rem',
              br: mRV({ _: '0rem', [rowChangeBreakPoint]: '0.25rem' }),
            },
          }),
          layout({ objectFit: 'cover' }),
        )}
      />
      <Dots
        length={length}
        current={current}
        onClickFunction={setCurrent}
        dotSize={mRV({ _: '1.25rem', [rowChangeBreakPoint]: '1rem' })}
        sx={merge(
          layout({
            pos: 'absolute',
            l: mRV({ _: '50%', [rowChangeBreakPoint]: '0.75rem' }),
            b: mRV({ _: '0.75rem', [rowChangeBreakPoint]: '50%' }),
          }),
          trans({
            transition: 'none',
            transform: mRV({
              _: 'translateX(-50%)',
              [rowChangeBreakPoint]: 'translateY(50%)',
            }),
          }),
          flexbox({ dir: mRV({ _: 'row', [rowChangeBreakPoint]: 'column' }) }),
        )}
      />
    </div>
  );
};

/*
 * TitleAndReadMore, show the title and read more button.
 */
interface TitleAndReadMoreProps {
  id: number;
  title: string;
  summary: string;
}

const TitleAndReadMore = ({ id, title, summary }: TitleAndReadMoreProps) => {
  const navigate = useNavigate();

  return (
    <div
      sx={merge(
        layout({ pos: 'relative', display: 'flex' }),
        flexbox({ flex: 1, dir: 'column' }),
        spacing({ p: padding }),
      )}
    >
      <h2
        sx={merge({
          fontSize: mRV({ _: '1.125rem', md: '1.25rem', lg: '1.5rem' }),
          lineHeight: mRV({ _: '1.75rem', lg: '2rem' }),
        })}
      >
        {title}
      </h2>
      <div sx={flexbox({ flex: 1 })}>{summary}</div>
      <Button
        sx={merge(
          layout({ pos: 'absolute', r: padding, b: padding }),
          text({ col: 'fg-0' }),
          bg({ col: { _: 'bg-2', hover: 'bg-4' } }),
          size({ h: '2rem', w: '8rem' }),
          border({ width: '2px', col: 'bg-6' }),
        )}
        onClick={() => navigate(`/news/${id}`)}
      >
        Read More
      </Button>
    </div>
  );
};

/*
 * Carousel. Can show a lot of content.
 */
const padding = '1rem';

interface contentMini {
  id: number;
  title: string;
  summary: string;
  image_url: string;
}

interface CarouselProps {
  contentMinis: contentMini[];
  rowChangeBreakPoint: BreakpointNameWithoutInit;
  className?: string;
}

export default (props: CarouselProps) => {
  const { contentMinis, rowChangeBreakPoint: bp, className } = props;
  const length = contentMinis.length;
  if (length === 0) {
    return (
      <div
        sx={merge(
          bg({ col: 'secondaryBackground' }),
          border({ radius: '0.25rem' }),
          flexbox({ place: { items: 'center', content: 'center' } }),
        )}
        className={className}
      >
        No news. Please post news.
      </div>
    );
  }

  const [current, setCurrent] = useState(0);
  const { id, title, summary, image_url } = contentMinis[current];

  return (
    <div
      sx={merge(
        layout({ display: 'flex' }),
        flexbox({ dir: mRV({ _: 'column', [bp]: 'row-reverse' }) }),
        bg({ col: 'secondaryBackground' }),
        border({ radius: '0.25rem' }),
      )}
      className={className}
    >
      <CarouselPreview
        rowChangeBreakPoint={bp}
        image_url={image_url}
        length={length}
        current={current}
        setCurrent={setCurrent}
      />
      <TitleAndReadMore title={title} summary={summary} id={id} />
    </div>
  );
};
