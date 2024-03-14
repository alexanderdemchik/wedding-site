import { ChangeEventHandler } from 'react';
import styles from './Checkbox.module.css';
import { useController } from 'react-hook-form';
import { FaRegSquare, FaRegSquareCheck } from 'react-icons/fa6';

interface ICheckboxProps {
  label: string;
  checked?: boolean;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ label, checked, onChange, name }: ICheckboxProps) => {
  return (
    <div className={styles['checkbox']}>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} name={name} />
        {checked ? <FaRegSquareCheck /> : <FaRegSquare />}
        <span>{label}</span>
      </label>
    </div>
  );
};

export const FormCheckbox = (props: ICheckboxProps) => {
  const { field } = useController({ name: props.name });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    field.onChange(e);
  };

  return <Checkbox {...props} checked={field.value} onChange={onChange}></Checkbox>;
};
