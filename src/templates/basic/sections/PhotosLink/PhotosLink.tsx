import { config } from '../../config';
import styles from './PhotosLink.module.css';
import { css } from '@emotion/react';

export function PhotosLink() {
  return (
    <section className={styles.container}>
      <div className={styles['bg-wrapper']}>
        <div
          className={styles.bg}
          css={css`
            background-image: url(${config.mainBannerBgLink});
          `}
        />
      </div>

      <div className={styles.filter} />

      <div className={styles['text-content']}>
        <div>А здесь будет ссылка на фотографии после свадьбы:</div>
        <div>
          <a href="/">Ссылка-на-фото</a>
        </div>
      </div>
      <div></div>
    </section>
  );
}
