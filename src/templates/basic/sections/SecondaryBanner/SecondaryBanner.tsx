import styles from './SecondaryBanner.module.css';
import { config } from '../../config';

export const SecondaryBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles['bribe-and-groom-avatars']}>
        <div className={styles.avatar}>
          <div className={styles['avatar-img-container']}>
            <img src={config.groomAvatarLink} className={styles['groom-img']} />
            <img src="/public/basic/butterfly_.png" className={styles['avatar-icon']} />
          </div>
          <span>{config.groomName}</span>
        </div>
        <div className={styles.and}>&</div>
        <div className={styles.avatar}>
          <div className={styles['avatar-img-container']}>
            <img src={config.brideAvatarLink} className={styles['bride-img']} />
            <img src="/public/basic/bucket_.png" className={styles['avatar-icon']} />
          </div>
          <span>{config.brideName}</span>
        </div>
      </div>

      <div className={styles['wedding-date']}>
        <span>Наша свадьба</span>
        <span>
          {config.targetDate.toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric' })} -{' '}
          {config.place}
        </span>
        <img src="/public/basic/divider__.png" height={30} />
      </div>
    </section>
  );
};
