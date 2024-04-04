import styles from './DaySchedule.module.css';
import { config } from '../../config';
import { Fade } from 'react-awesome-reveal';
import { formatDate } from '../MainBanner/MainBanner';

export const DaySchedule = () => {
  return (
    <section className={styles.container}>
      <Fade direction={'up'} fraction={0} triggerOnce css={{ width: '100%', textAlign: 'center' }}>
        <h2>Расписание дня</h2>
        <p className={styles['target-date']}>{formatDate(config.targetDate)}</p>
        <div className={styles['items-container']}>
          {config.daySchedule.map(({ title, time }) => (
            <div className={styles.item}>
              <span className={styles.time}>{time}</span>
              <h3 className={styles.title}>{title}</h3>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
};
