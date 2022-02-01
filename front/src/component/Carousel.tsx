import React, { useState } from 'react';
import classNames from 'classnames';

type breakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Given `begin`, and `end`. Return [begin, begin+1, ..., end].
function buildArray(begin: number, end: number): number[] {
  let result: number[] = [];
  for (let i: number = begin; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Given `breakPoint` and `className`(just string), and it will return
// `${breakPoint}:${className[0]} ${breakPoint}:${className[1]} ...`
function brkPt(breakPoint: breakPoint, className: string) {
  className = className.split(' ');
  className = className.map((className) => breakPoint + ':' + className);
  return classNames(className);
}

// Dot.
interface DotProps {
  index: number;
  current: number;
  onClick?: (index: number) => void;
}

function Dot({ index, current, onClick }: DotProps): React.Component {
  return (
    <button
      onClick={
        typeof onClick === 'undefined' ? undefined : () => onClick(index)
      }
      className={classNames(
        'w-3 h-3 rounded-full shadow bg-opacity-75',
        index == current ? 'bg-white' : 'bg-gray-400',
      )}
    />
  );
}

// Carousel.
interface contentMini {
  title: string;
  summary: string;
  image_uri: string;
}

interface CarouselProps {
  contentMinis: contentMini[];
  rowChangeBreakPoint: breakPoint;
  className: string;
}

export default function Carousel({
  contentMinis,
  rowChangeBreakPoint,
  className,
}: CarouselProps) {
  const length = contentMinis.length;
  const [current, setCurrent] = useState(0);
  const { title, summary, image_uri } = contentMinis[current];

  const useless = `
    md:flex-row-reverse md:rounded-tl-none md:rounded-r md:bottom-1/2
    md:translate-y-1/2 md:translate-x-0 md:left-3 md:flex-col
  `;

  return (
    <div
      className={classNames(
        className,
        'bg-second rounded flex flex-col',
        brkPt(rowChangeBreakPoint, 'flex-row-reverse'),
        // 'md:flex-row-reverse',
      )}
    >
      {/* Picture and dots */}
      <div className="w-full md:w-4/6 h-3/5 md:h-full relative">
        <img
          src={image_uri}
          className={classNames(
            `w-full h-full dark:brightness-75 object-cover bg-green-500`,
            `rounded-t`,
            brkPt(rowChangeBreakPoint, 'rounded-tl-none rounded-r'),
          )}
        />
        <div
          className={classNames(
            'absolute',
            'transition-none',
            'left-1/2 -translate-x-1/2 bottom-3',
            brkPt(
              rowChangeBreakPoint,
              'bottom-1/2 translate-y-1/2 translate-x-0 left-3',
            ),
            'flex gap-2',
            brkPt(rowChangeBreakPoint, 'flex-col'),
          )}
        >
          {buildArray(0, length - 1).map((index) => (
            <Dot
              index={index}
              current={current}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
      {/* Title and summary */}
      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-lg md:text-xl lg:text-2xl">{title}</h2>
        <div className="flex-1">{summary}</div>
        <div className="text-right">
          <button
            className={`bg-second hover-bg-second border-second rounded w-32 h-8`}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
