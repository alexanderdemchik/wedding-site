import { Carousel } from '../../components/Carousel/Carousel';
import styles from './Photos.module.css';

const images = [
  {
    original: '/public/basic/bg_main_banner.jpg',
  },
  {
    original: 'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg',
  },
  {
    original:
      'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg',
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
