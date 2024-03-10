import { useDrag } from '@use-gesture/react';
import styles from './Carousel.module.css';
import { useSpring, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMeasure, useMediaQuery } from '@uidotdev/usehooks';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface Props {
  images: {
    original: string;
  }[];
}

const NUMBER_OF_FAKED_SLIDES = 2;

export const Carousel = ({ images }: Props) => {
  const isMobile = !useMediaQuery('(min-width: 768px)');
  const slides = [images.slice(-2)[0], images.slice(-1)[0], ...images, images[0], images[1]];

  const [slideWindowRef, { width: slideWindowWidth, height: slideWindowHeight }] = useMeasure();
  const [containerRef, { width: containerWidth }] = useMeasure();

  const slideSpacing = isMobile ? 0 : 100;
  const slideWidth = slideWindowWidth || 0;
  const slideHeight = slideWindowHeight || 0;
  const fullWidth = containerWidth || 0;

  const [activeSlide, setActiveSlide] = useState(0);

  const dataRef = useRef({
    activeSlide: NUMBER_OF_FAKED_SLIDES,
    isTransitionInProgress: false,
    dragData: {
      x: 0,
    },
  });

  const [{ x }, api] = useSpring(() => ({
    x: -dataRef.current.activeSlide * slideWidth,
  }));

  const bind = useDrag(
    ({ movement: [mx], first, cancel }) => {
      if (!isMobile) return;

      if (first) {
        dataRef.current.dragData = { x: x.get() };
      }

      if (Math.abs(mx) > 100) {
        cancel();
        slideTo(mx < 0 ? dataRef.current.activeSlide + 1 : dataRef.current.activeSlide - 1);
        return;
      }
    },
    { axis: 'x' }
  );

  const getOriginalSlideIndex = (i: number) => {
    if (i === 1) {
      return images.length - 1;
    }

    if (i === slides.length - NUMBER_OF_FAKED_SLIDES) {
      return 0;
    }

    return i - NUMBER_OF_FAKED_SLIDES;
  };

  const slideTo = async (slideIndex: number, ignoreTransitionBlock = false, immediate = false) => {
    if (!dataRef.current.isTransitionInProgress || ignoreTransitionBlock) {
      dataRef.current.isTransitionInProgress = true;

      dataRef.current.activeSlide = slideIndex;
      setActiveSlide(getOriginalSlideIndex(slideIndex));

      api.start({
        x: -dataRef.current.activeSlide * slideWidth,
        onResolve: () => {
          if (slideIndex === 1) {
            dataRef.current.activeSlide = slides.length - NUMBER_OF_FAKED_SLIDES - 1;
            api.start({
              x: -dataRef.current.activeSlide * slideWidth,
              immediate: true,
              onResolve: () => {
                dataRef.current.isTransitionInProgress = false;
              },
            });
          } else if (slideIndex === slides.length - NUMBER_OF_FAKED_SLIDES) {
            dataRef.current.activeSlide = NUMBER_OF_FAKED_SLIDES;
            api.start({
              x: -dataRef.current.activeSlide * slideWidth,
              immediate: true,
              onResolve: () => {
                dataRef.current.isTransitionInProgress = false;
              },
            });
          } else {
            dataRef.current.isTransitionInProgress = false;
          }
        },
        immediate: immediate,
      });
    }
  };

  useEffect(() => {
    slideTo(dataRef.current.activeSlide, true, true);
  }, [slideWidth]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.arrows}>
        <div
          className={styles['arrow-left-container']}
          style={{ height: slideHeight, width: (fullWidth - slideWidth) / 2 + slideSpacing }}
          onClick={() => slideTo(dataRef.current.activeSlide - 1)}
        >
          <div className={styles['arrow-left']}>
            <FaArrowLeft />
          </div>
        </div>
        <div
          className={styles['arrow-right-container']}
          style={{ height: slideHeight, width: (fullWidth - slideWidth) / 2 + slideSpacing }}
          onClick={() => slideTo(dataRef.current.activeSlide + 1)}
        >
          <div className={styles['arrow-right']}>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className={styles['slide-window']} ref={slideWindowRef}>
        <animated.ul className={styles['slide-list']} {...bind()} style={{ x, touchAction: 'pan-y' }}>
          {slides.map((el, i) => (
            <li className={styles.slide} style={{ width: slideWidth }}>
              <div className={styles['image-wrapper']} style={{ marginLeft: slideSpacing, marginRight: slideSpacing }}>
                <img
                  className={clsx({ [styles.active]: activeSlide === getOriginalSlideIndex(i) })}
                  src={el.original}
                  draggable="false"
                />
              </div>
            </li>
          ))}
        </animated.ul>
      </div>
      <div className={styles.dots}>
        {images.map((_el, i) => (
          <div
            className={clsx(styles.dot, { [styles.active]: i === activeSlide })}
            onClick={() => slideTo(i + NUMBER_OF_FAKED_SLIDES, true)}
          />
        ))}
      </div>
    </div>
  );
};
