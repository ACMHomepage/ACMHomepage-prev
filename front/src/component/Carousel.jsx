import React from 'react';
import classNames from 'classnames';

export default function Carousel({ titleAndImages, className }) {
  const { title, summary, image_uri } = titleAndImages[0];
  return (
    <div
      className={classNames(
        'bg-second rounded flex flex-col md:flex-row-reverse',
        className,
      )}
    >
      <div className="w-full md:w-4/6 h-4/6 md:h-full">
        <img
          src={image_uri}
          className={`w-full h-full rounded-t md:rounded-tl-none md:rounded-r
              dark:brightness-75 object-cover`}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-2xl">{title}</h2>
        <div className="flex-1">{summary}</div>
        <div className="text-right">
          <button className="bg-second hover-bg-second rounded border w-32 h-8">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
