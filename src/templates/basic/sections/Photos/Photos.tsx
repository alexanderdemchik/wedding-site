import { Carousel } from '../../components/Carousel/Carousel';
import styles from './Photos.module.css';

const images = [
  {
    original: '/basic/photos/1.jpg',
  },
  {
    original: '/basic/photos/2.jpg',
  },
  {
    original: '/basic/photos/3.jpg',
  },
  {
    original: '/basic/photos/6.jpg',
  },
  {
    original: '/basic/photos/7.jpg',
  },
  {
    original: '/basic/photos/8.jpg',
  },
];

export const Photos = () => {
  return (
    <div className={styles.container}>
      <h3>Наши фото</h3>
      <Carousel images={images} />
    </div>
  );
};
