import styles from './DaySchedule.module.css';
import { config } from '../../config';

export const DaySchedule = () => {
  return (
    <section className={styles.container}>
      <h2>Расписание дня</h2>
      <div className={styles['items-container']}>
        {config.daySchedule.map(({ icon, title, time, place, address }, i) => (
          <>
            {!!i && <div className={styles.divider} />}

            <div className={styles.item}>
              <img src={icon} />
              <span className={styles.time}>{time}</span>
              <h3 className={styles.title}>{title}</h3>
              <span className={styles.place}>{place}</span>
              {address && <address>{address}</address>}
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
