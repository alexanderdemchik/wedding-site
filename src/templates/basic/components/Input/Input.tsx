import { FormControl, Input as MuiInput } from '@mui/base';
import styles from './Input.module.css';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <FormControl className={styles.wrapper}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <MuiInput className={styles.input} {...props} />
    </FormControl>
  );
};

export const InputLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
