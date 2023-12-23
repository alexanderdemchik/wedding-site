import { config } from '../../config';
import styles from './Message.module.css';

export const Message = () => {
  return (
    <section className={styles.container}>
      {config.message.map((m) => (
        <span>{m}</span>
      ))}
      <img src="/public/basic/divider.png" />
    </section>
  );
};
