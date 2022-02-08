import { useState } from 'react';
import styled from 'styled-components';
import type { CSSProperties } from 'theme-ui';

import * as c from '../util/class';
import Button from './Button';
import Dots from './Dots';
import { mRV } from '../util/anotherTheme';
import type { BreakpointNameWithoutInit } from '../util/anotherTheme';

const padding = '1rem';

// Carousel.
interface contentMini {
  title: string;
  summary: string;
  image_uri: string;
}

interface CarouselProps {
  contentMinis: contentMini[];
  rowChangeBreakPoint: BreakpointNameWithoutInit;
  className: string;
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${c.color('green', 500)};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  ${(props: any) =>
    c.brkPt(
      props.breakPoint,
      `
    border-top-left-radius: 0;
    border-bottom-right-radius: 0.25rem;
  `,
    )}
  object-fit: cover;
  .dark & {
    filter: brightness(0.75);
  }
`;

const StyledPreview = styled.div`
  position: relative;
  width: 100%;
  height: ${c.size('3/5')};
  ${(props: any) =>
    c.brkPt(
      props.breakPoint,
      `
    width: ${c.size('2/3')};
    height: 100%;
  `,
    )}
`;

const StyledCarousel = styled.div`
  background-color: ${c.color('green', 100)};
  ${c.dark(`
    background-color: ${c.color('green', 700)};
  `)}
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  ${(props: any) =>
    c.brkPt(
      props.breakPoint,
      `
    flex-direction: row-reverse;
  `,
    )}
`;

const StyledTitleAndSummary = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTitle = styled.h2`
  font-size: 1.125rem;
  line-height: 1.75rem;
  ${c.brkPt(
    'md',
    `
    font-size: 1.25rem;
    line-height: 1.75rem;
  `,
  )}
  ${c.brkPt(
    'lg',
    `
    font-size: 1.5rem;
    line-height: 2rem;
  `,
  )}
`;

const StyledSummary = styled.div`
  flex: 1;
`;

export default function Carousel({
  contentMinis,
  rowChangeBreakPoint,
  className,
}: CarouselProps) {
  const length = contentMinis.length;
  const [current, setCurrent] = useState(0);
  const { title, summary, image_uri } = contentMinis[current];

  return (
    <StyledCarousel className={className} breakPoint={rowChangeBreakPoint}>
      {/* Picture and dots */}
      <StyledPreview breakPoint={rowChangeBreakPoint}>
        <StyledImg src={image_uri} breakPoint={rowChangeBreakPoint} />
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
      </StyledPreview>
      {/* Title and summary */}
      <StyledTitleAndSummary>
        <StyledTitle>{title}</StyledTitle>
        <StyledSummary>{summary}</StyledSummary>
        <Button
          position="absolute"
          right={padding}
          bottom={padding}
          width="8rem"
          btnTheme="secondary"
          withBorder
        >
          Read More
        </Button>
      </StyledTitleAndSummary>
    </StyledCarousel>
  );
}
