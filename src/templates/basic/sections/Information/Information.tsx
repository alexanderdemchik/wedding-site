import { config } from '../../config';
import styles from './Information.module.css';
import { css } from '@emotion/react';

export const Information = () => {
  return (
    <section className={styles.container}>
      <h3>Информация</h3>
      {config.information.map(({ title, content, dressCodeColors }) => (
        <div>
          <h4>{title}</h4>
          <p>{content}</p>
          {!!dressCodeColors?.length && (
            <ul className={styles['dress-code']}>
              {dressCodeColors.map((color) => (
                <li
                  className={styles['dress-code-item']}
                  css={css`
                    background-color: ${color};
                  `}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
      <img src={config.dividerImageLink} height={30} />
    </section>
  );
};
