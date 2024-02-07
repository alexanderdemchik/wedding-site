import { useQuery } from 'react-query';
import { config } from '../../config';
import styles from './PhotosLink.module.css';
import { css } from '@emotion/react';
import { DefaultService } from '../../../../../@generated/api/services/DefaultService';

export function PhotosLink() {
  const query = useQuery({ queryFn: () => DefaultService.appControllerGetPhotosLink() });

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
          <a href={query.data?.link || '/'}>{query.data?.link || 'Ссылка на фото'}</a>
        </div>
      </div>
      <div></div>
    </section>
  );
}
