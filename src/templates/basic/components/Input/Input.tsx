import { FormControl, Input as MuiInput } from '@mui/base';
import styles from './Input.module.css';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Input = React.forwardRef(({ label, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <FormControl className={styles.wrapper}>
      <InputLabel htmlFor={props.name}>{label}</InputLabel>
      <MuiInput className={styles.input} {...props} ref={ref} />
    </FormControl>
  );
});

export const InputLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export const FormInput = (props: InputProps) => {
  const { register } = useFormContext();
  return <Input {...props} {...register(props.name)} />;
};
