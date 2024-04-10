import { css, keyframes } from '@emotion/react';
import styles from './RSPV.module.css';
import { config } from '../../config';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../../components/Input/Input';
import { PhoneInput } from '../../components/PhoneInput/PhoneInput';
import { FormSelect, Option } from '../../components/Select/Select';
import { FormDrinkSelector } from '../../components/DrinkSelector/DrinkSelector';
import { useMutation, useQuery } from 'react-query';
import { FormsService } from '../../../../../@generated/api/services/FormsService';
import { FormDto } from '../../../../../@generated/api/models/FormDto';
import { useLocalStorage } from 'usehooks-ts';
import { useState } from 'react';
import clsx from 'clsx';
import { FaRegCircleCheck, FaRegFaceFrownOpen } from 'react-icons/fa6';
import { Icon } from '../../components/Icon';
import { queryClient } from '../../../../main';
import { FormCheckbox } from '../../components/Checkbox/Checkbox';

export const Form = () => {
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [submittedFormId, setSubmittedFormId] = useLocalStorage<string | undefined>('submittedFormId', undefined);

  const formSubmitMutation = useMutation({
    mutationFn: ({ body, isUpdate = false }: { body: FormDto; isUpdate?: boolean }) => {
      return isUpdate ? FormsService.formsControllerUpdate(body.id!, body) : FormsService.formsControllerCreate(body);
    },
    onSuccess: (data) => {
      setIsFormEdit(false);
      setSubmittedFormId(data.id);
      queryClient.setQueryData('form', () => data);
    },
  });

  const submittedFormQuery = useQuery({
    queryKey: 'form',
    queryFn: () => FormsService.formsControllerFindOne(submittedFormId!),
    enabled: !!submittedFormId,
    retry(failureCount) {
      if (failureCount > 2) {
        return false;
      }

      return true;
    },
    onError: () => {
      setSubmittedFormId(undefined);
    },
  });

  const methods = useForm({
    defaultValues: {
      name: submittedFormQuery.data?.name || '',
      phone: submittedFormQuery.data?.phone || '',
      select: submittedFormQuery.data?.confirmation || 'Приду',
      drinks: submittedFormQuery.data?.drinkPreferences || ([] as string[]),
      email: submittedFormQuery.data?.email || '',
      transfer: false,
      quantity: 1,
    },
  });

  const isComing = methods.watch('select') === 'Приду';

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
      <div className={styles['content']}>
        <div
          className={clsx(styles['confirmed-message-wrapper'], {
            [styles['hidden']]: !(submittedFormId && !isFormEdit),
          })}
        >
          <Icon className={styles['check-icon']}>
            {submittedFormQuery.data?.confirmation !== 'К сожалению не смогу' ? (
              <FaRegCircleCheck />
            ) : (
              <FaRegFaceFrownOpen />
            )}
          </Icon>
          <h3>
            {submittedFormQuery.data?.confirmation !== 'К сожалению не смогу'
              ? 'Вы подтвердили свое присутствие'
              : 'Нам жаль что вы не сможете прийти'}
          </h3>
          <p
            onClick={() => {
              setIsFormEdit(true);
              methods.reset({
                name: submittedFormQuery.data?.name || '',
                phone: submittedFormQuery.data?.phone || '',
                select: submittedFormQuery.data?.confirmation || 'Приду',
                drinks: submittedFormQuery.data?.drinkPreferences || ([] as string[]),
                transfer: submittedFormQuery.data?.transfer || false,
                quantity: submittedFormQuery.data?.quantity,
              });
            }}
          >
            Хотите изменить данные?
          </p>
        </div>
        <div className={clsx(styles['form-wrapper'], { [styles['hidden']]: submittedFormId && !isFormEdit })}>
          <h3>Подтвердите свое присутствие</h3>
          <div className={styles.form}>
            <form
              onSubmit={methods.handleSubmit((data) => {
                if (submittedFormId) {
                  return formSubmitMutation.mutate({
                    body: {
                      id: submittedFormId,
                      name: data.name,
                      drinkPreferences: data.drinks,
                      confirmation: data.select,
                      phone: data.phone,
                      transfer: data.transfer,
                      quantity: data.quantity,
                      email: data.email,
                    },
                    isUpdate: true,
                  });
                } else {
                  return formSubmitMutation.mutate({
                    body: {
                      name: data.name,
                      drinkPreferences: data.drinks,
                      confirmation: data.select,
                      phone: data.phone,
                      transfer: data.transfer,
                      quantity: data.quantity,
                      email: data.email,
                    },
                  });
                }
              })}
            >
              <FormProvider {...methods}>
                <FormInput name="name" label="Ваше имя" placeholder="Имя Фамилия" required type="name" />
                <FormSelect name="select" label="Подтверждение присутствия">
                  <Option value={'Приду'}>Приду</Option>
                  <Option value={'К сожалению не смогу'}>К сожалению не смогу</Option>
                </FormSelect>
                {isComing && (
                  <FormSelect name="quantity" label="Количество гостей">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                      <Option value={el}>{el}</Option>
                    ))}
                  </FormSelect>
                )}
                <PhoneInput name="phone" label="Телефон" />
                <FormInput
                  name="email"
                  type="email"
                  label="Email (необязательно, отправим ссылку на фото)"
                  placeholder="aaaa@gmail.com"
                />

                <FormDrinkSelector label="Что предпочитаете пить?" name="drinks" />
                <FormCheckbox name="transfer" label="Нужен трансфер" />
                <button type="submit" className={styles.button} disabled={formSubmitMutation.isLoading}>
                  Подтвердить
                </button>
                {formSubmitMutation.isError && (
                  <div style={{ color: 'red' }}>Произошла ошибка, попробуйте еще раз позже</div>
                )}
              </FormProvider>
            </form>
          </div>
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
        <img src={`/basic/petal_${i % 2 === 0 ? 1 : 3}.png`} />
      </div>
    ));
};
