import { useState } from 'react';
import type { CSSProperties } from 'theme-ui';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import Dots from './Dots';

import { mRV, setColor, setBorder, setFlex } from '../util/theme';
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
      sx={{
        position: 'relative',
        width: mRV({ _: '100%', [rowChangeBreakPoint]: `${(100 * 2) / 3}%` }),
        height: mRV({ _: `${(100 * 3) / 5}%`, [rowChangeBreakPoint]: '100%' }),
      }}
    >
      <img
        src={image_url}
        sx={{
          width: '100%',
          height: '100%',
          bg: 'green.5',
          borderTopLeftRadius: mRV({
            _: '0.25rem',
            [rowChangeBreakPoint]: '0rem',
          }),
          borderTopRightRadius: '0.25rem',
          borderBottomRightRadius: mRV({
            _: '0rem',
            [rowChangeBreakPoint]: '0.25rem',
          }),
          objectFit: 'cover',
          '.dark &': {
            brightness: 0.75,
          },
        }}
      />
      <Dots
        length={length}
        current={current}
        onClickFunction={setCurrent}
        dotSize={mRV({ _: '1.25rem', [rowChangeBreakPoint]: '1rem' })}
        sx={{
          position: 'absolute',
          left: mRV({ _: '50%', [rowChangeBreakPoint]: '0.75rem' }),
          bottom: mRV({ _: '0.75rem', [rowChangeBreakPoint]: '50%' }),
          transform: mRV({
            _: 'translateX(-50%)',
            [rowChangeBreakPoint]: 'translateY(50%)',
          }),
          flexDirection: mRV<CSSProperties['flexDirection']>({
            _: 'row',
            [rowChangeBreakPoint]: 'column',
          }),
          transition: 'none',
        }}
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
      sx={{
        flex: 1,
        padding,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <h2
        sx={{
          fontSize: mRV({ _: '1.125rem', md: '1.25rem', lg: '1.5rem' }),
          lineHeight: mRV({ _: '1.75rem', lg: '2rem' }),
        }}
      >
        {title}
      </h2>
      <div sx={{ flex: 1 }}>{summary}</div>
      <Button
        sx={{
          width: '8rem',
          height: '2rem',
          position: 'absolute',
          right: padding,
          bottom: padding,
          ...setColor({ bg: 'bg-2', color: 'fg-0', hover: { bg: 'bg-4' } }),
          ...setBorder({ width: '2px', color: 'bg-6' }),
        }}
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
        sx={{
          bg: 'secondaryBackground',
          borderRadius: '0.25rem',
          ...setFlex({ center: true })
        }}
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
      sx={{
        bg: 'secondaryBackground',
        borderRadius: '0.25rem',
        display: 'flex',
        flexDirection: mRV<CSSProperties['flexDirection']>({
          _: 'column',
          [bp]: 'row-reverse',
        }),
      }}
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
