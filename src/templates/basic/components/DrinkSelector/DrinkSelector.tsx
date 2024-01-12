import { FaCircleCheck } from 'react-icons/fa6';
import styles from './DrinkSelector.module.css';
import clsx from 'clsx';
import { useController } from 'react-hook-form';

interface Props {
  value: string[];
  onChange: (val: string) => void;
  label: string;
}

const BASE_IMG_PATH = '/common/drinks_selector';

const drinks = [
  {
    name: 'Водка',
    imgLink: `${BASE_IMG_PATH}/vodka.jpg`,
  },
  {
    name: 'Коньяк',
    imgLink: `${BASE_IMG_PATH}/conyak.jpg`,
  },
  {
    name: 'Шампанское',
    imgLink: `${BASE_IMG_PATH}/shamp.jpg`,
  },
  {
    name: 'Красное вино',
    imgLink: `${BASE_IMG_PATH}/redwine.jpg`,
  },
  {
    name: 'Белое вино',
    imgLink: `${BASE_IMG_PATH}/whitewine.jpg`,
  },
  {
    name: 'Пиво',
    imgLink: `${BASE_IMG_PATH}/beer.jpg`,
  },
  {
    name: 'Сок',
    imgLink: `${BASE_IMG_PATH}/juice.jpg`,
  },
];

export const DrinkSelector = (props: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{props.label}</span>
      {drinks.map((el) => (
        <div className={styles.item}>
          <img src={el.imgLink} onClick={() => props.onChange(el.name)} />
          <span className={styles.name}>{el.name}</span>
          <div className={clsx(styles.check, { [styles.selected]: props.value.includes(el.name) })}>
            <FaCircleCheck />
          </div>
        </div>
      ))}
    </div>
  );
};

export const FormDrinkSelector = ({ name, label }: { name: string; label: string }) => {
  const { field } = useController({ name });

  const onChange = (val: string) => {
    field.onChange(!field.value.includes(val) ? [...field.value, val] : field.value.filter((el: string) => el !== val));
  };

  return <DrinkSelector value={field.value} label={label} onChange={onChange}></DrinkSelector>;
};
