import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import Dots from './Dots';

import styles from './styles/Carousel.module.scss';

interface contentMini {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
}

interface CarouselProps {
  contentMinis: contentMini[];
}

/**
 * Carousel. Can show a lot of content.
 */
export default (props: CarouselProps) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [className, setClassName] = useState(styles.Carousel);

  const self = useRef(null as null | HTMLDivElement);

  useEffect(() => {
    let selfContent = self?.current;
    if (!selfContent) return;

    let state = 0; // 0 - uninited state, 1 - row mode, 2 - column mode.
    const callback = () => {
      let width = self.current?.offsetWidth;

      if (width && width > 800) {
        if (state != 1) {
          state = 1;
          setClassName(classNames(styles.Carousel, styles._row));
        }
      } else if (state != 2) {
        state = 2;
        setClassName(styles.Carousel);
      }
    };
    callback();
    new ResizeObserver(callback).observe(selfContent);
  }, [self]);

  const { contentMinis } = props;

  const length = /* 0; */ contentMinis.length;
  if (length === 0) {
    return <div className={styles.Carousel}>No news. Please post news.</div>;
  }

  const { id, title, summary, imageUrl } = contentMinis[current];

  return (
    <div className={className} ref={self}>
      <div className={styles.Preview}>
        <img src={imageUrl} className={styles.Img} />
        <Dots
          length={length}
          current={current}
          onClickFunction={setCurrent}
          className={styles.Dots}
        />
      </div>
      <div className={styles.Entry} onClick={() => navigate(`/news/${id}`)}>
        <h2 className={styles.Title}>{title}</h2>
        <div>{summary}</div>
      </div>
    </div>
  );
};
