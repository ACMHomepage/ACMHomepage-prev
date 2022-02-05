import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import * as c from '../util/class.ts';

const padding = '1rem';

// Given `begin`, and `end`. Return [begin, begin+1, ..., end].
function buildArray(begin: number, end: number): number[] {
  let result: number[] = [];
  for (let i: number = begin; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Dot. Clickable. If the onClick function name is `a`, when we click it, it
// will call `a(index)`.
interface DotProps {
  index: number;
  current: number;
  breakPoint: c.BreakPoint;
  onClick?: (index: number) => void;
}

const StyledDot = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  ${(props: any) => c.brkPt(props.breakPoint, `
    width: 1rem;
    height: 1rem;
  `)}
  background-color: ${(props: any) => props.active ? c.color('gray', 100): c.color('gray', 800)};
  border-radius: ${c.size('big')};
  opacity: ${(props: any) => props.active ? '1' : '0.5'};
  border: 1px solid ${(props: any) => props.active ? c.color('gray', 800) : c.color('gray', 300)};
`;

const Dot : FunctionComponent<DotProps> = ({ index, current, onClick, breakPoint }: DotProps) => {
  const onClickWarper =
    typeof onClick === 'undefined' ? undefined : () => onClick(index);
  return <StyledDot onClick={onClickWarper} active={index === current} breakPoint={breakPoint} />;
}

// Carousel.
interface contentMini {
  title: string;
  summary: string;
  image_uri: string;
}

interface CarouselProps {
  contentMinis: contentMini[];
  rowChangeBreakPoint: c.breakPoint;
  className: string;
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${c.color('green', 500)};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  ${(props: any) => c.brkPt(props.breakPoint, `
    border-top-left-radius: 0;
    border-bottom-right-radius: 0.25rem;
  `)}
  object-fit: cover;
  .dark & {
    filter:brightness(0.75);
  }
`;

const StyledDots = styled.div`
  position: absolute;
  transition: none;
  left: 50%;
  bottom: 0.75rem;
  ${(props: any) => c.brkPt(props.breakPoint, `
    bottom: 50%;
    left: 0.75rem;
  `)}
  transform: translate(-50%, 0);
  ${(props: any) => c.brkPt(props.breakPoint, `
    transform: translate(0, 50%);
  `)}
  display: flex;
  gap: 0.5rem;
  ${(props: any) => c.brkPt(props.breakPoint, `
    flex-direction: column;
  `)}
`;

const StyledPreview = styled.div`
  position: relative;
  width: 100%;
  height: ${c.size('3/5')};
  ${(props: any) => c.brkPt(props.breakPoint, `
    width: ${c.size('2/3')};
    height: 100%;
  `)}
`;

const StyledCarousel = styled.div`
  background-color: ${c.color('green', 100)};
  ${c.dark(`
    background-color: ${c.color('green', 700)};
  `)}
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  ${(props: any) => c.brkPt(props.breakPoint, `
    flex-direction: row-reverse;
  `)}
`;

interface ReadMoreButton {
  onClick?: () => void;
}

const StyledReadMoreButton = styled.button`
  position: absolute;
  bottom: ${padding};
  right: ${padding};
  width: 8rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid ${c.color('green', 700)};
  color: ${c.color('green', 700)};
  &:hover {
    color: ${c.color('green', 100)};
    background: ${c.color('green', 700)};
  }
  ${c.dark(`
    color: ${c.color('green', 100)};
    border: 1px solid ${c.color('green', 100)};
    &:hover {
      color: ${c.color('green', 700)};
      background: ${c.color('green', 100)};
    }
  `)}
`;

const ReadMoreButton = ({onClick}: ReadMoreButton) => {
  return <StyledReadMoreButton onClick={onClick}>
    Read More
  </StyledReadMoreButton>;
}

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
  ${c.brkPt('md', `
    font-size: 1.25rem;
    line-height: 1.75rem;
  `)}
  ${c.brkPt('lg', `
    font-size: 1.5rem;
    line-height: 2rem;
  `)}
`;

const StyledSummary = styled.div`
  flex: 1;
`

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
        <StyledDots breakPoint={rowChangeBreakPoint}>
          {buildArray(0, length - 1).map((index) => (
            <Dot
              index={index}
              current={current}
              onClick={() => setCurrent(index)}
              breakPoint={rowChangeBreakPoint}
            />
          ))}
        </StyledDots>
      </StyledPreview>
      {/* Title and summary */}
      <StyledTitleAndSummary>
        <StyledTitle>{title}</StyledTitle>
        <StyledSummary>{summary}</StyledSummary>
        <ReadMoreButton />
      </StyledTitleAndSummary>
    </StyledCarousel>
  );
}
