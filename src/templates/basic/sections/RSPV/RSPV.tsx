import { css, keyframes } from '@emotion/react';
import styles from './RSPV.module.css';
import { config } from '../../config';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../../components/Input/Input';
import { PhoneInput } from '../../components/PhoneInput/PhoneInput';
import { FormSelect, Option } from '../../components/Select/Select';
import { FormDrinkSelector } from '../../components/DrinkSelector/DrinkSelector';

export const Form = () => {
  const methods = useForm({ defaultValues: { name: '', phone: '', select: 'Приду', drinks: [] } });

  return (
    <section className={styles.container}>
      <div className={styles['bg-wrapper']}>
        <div
          className={styles.bg}
          css={css`
            background-image: url(${config.formBackgroundImageLink});
          `}
        />
      </div>

      <div className={styles.filter} />
      <div className={styles['form-wrapper']}>
        <h3>Подтвердите свое присутствие</h3>
        <div className={styles.form}>
          <FormProvider {...methods}>
            <FormInput name="name" label="Ваше имя" placeholder="Иван Иванов" />
            <PhoneInput name="phone" label="Телефон" />
            <FormSelect name="select" defaultValue={'sssss'} label="Подтверждение присутствия">
              <Option value={'Приду'}>Приду</Option>
              <Option value={'Приду не один(не одна)'}>Приду не один(не одна)</Option>
              <Option value={'К сожалению не смогу'}>К сожалению не смогу</Option>
            </FormSelect>
            <FormDrinkSelector label="Что предпочитаете пить?" name="drinks" />
            <button className={styles.button}>Подтвердить</button>
          </FormProvider>
        </div>
      </div>
      {generatePetals()}
    </section>
  );
};

const generatePetals = () => {
  const yMax = 1000;
  const transitionParamsByIndex = [
    [300, yMax, -45, 7, 0],
    [100, yMax, 45, 11, 5],
    [-500, yMax, -45, 16, 0],
    [400, yMax, 45, 13, 5],
    [-100, yMax, 45, 9, 0],
    [490, yMax, -45, 6, 5],
    [-400, yMax, 45, 12, 0],
    [250, yMax, -45, 9, 3],
    [-200, yMax, 45, 16, 0],
    [-400, yMax, 45, 14, 4],
    [300, yMax, -45, 7, 10],
    [100, yMax, 45, 11, 10],
    [-500, yMax, -45, 16, 10],
    [400, yMax, 45, 13, 10],
    [-100, yMax, 45, 9, 10],
    [490, yMax, -45, 6, 10],
    [-400, yMax, 45, 12, 10],
    [250, yMax, -45, 9, 10],
    [-200, yMax, 45, 16, 10],
    [-400, yMax, 45, 14, 10],
  ];

  const animationGenerator = (i: number) =>
    keyframes`
      0% {
        transform: translateX(0px)translateY(0px)rotate(0deg);
      }
      100% {
        transform:  translateX(${transitionParamsByIndex[i][0]}px)translateY(${transitionParamsByIndex[i][1]}px)rotate(${transitionParamsByIndex[i][2]}deg);
      }
    `;

  return Array(20)
    .fill(0)
    .map((_el, i) => (
      <div
        className={styles.petal}
        css={css`
          left: ${i * 5}%;
          top: -50px;
          animation: ${animationGenerator(i)} ${transitionParamsByIndex[i][3]}s ${transitionParamsByIndex[i][4]}s
            infinite linear;
        `}
      >
        <img src={`/public/basic/petal_${i % 2 === 0 ? 1 : 3}.png`} />
      </div>
    ));
};
