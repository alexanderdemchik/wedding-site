import { useDateTimer } from '../../../../common/hooks/useDateTimer';
import styles from './Timer.module.css';
import { config } from '../../config';

const normalizeNumber = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }

  return num;
};

export function Timer() {
  const { days, hours, minutes, seconds } = useDateTimer(config.targetDate);

  return (
    <section className={styles.container}>
      <div className={styles['timer']}>
        <div className={styles['time-part']}>
          <span>{normalizeNumber(days)}</span>
          <span>Дней</span>
        </div>
        <div className={styles['time-part']}>:</div>
        <div className={styles['time-part']}>
          <span>{normalizeNumber(hours)}</span>
          <span>Часов</span>
        </div>
        <div className={styles['time-part']}>:</div>
        <div className={styles['time-part']}>
          <span>{normalizeNumber(minutes)}</span>
          <span>Минут</span>
        </div>
        <div className={styles['time-part']}>:</div>
        <div className={styles['time-part']}>
          <span>{normalizeNumber(seconds)}</span>
          <span>Секунд</span>
        </div>
      </div>
    </section>
  );
}
