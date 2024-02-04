import { FormControl, useFormControlContext } from '@mui/base';
import styles from './Input.module.css';
import React, { FocusEventHandler, InputHTMLAttributes, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const Input = React.forwardRef(({ label, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  return (
    <FormControl className={styles.wrapper}>
      <InputLabel htmlFor={props.name}>
        {label}
        {!!props.required && ' *'}
      </InputLabel>
      <BaseInput className={styles.input} {...props} ref={ref} />
    </FormControl>
  );
});

export const BaseInput = React.forwardRef(
  (props: Omit<InputProps, 'label'>, ref: React.ForwardedRef<HTMLInputElement>) => {
    const formControl = useFormControlContext();

    const onBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      props.onBlur?.(e);
      formControl?.onBlur();
    };

    const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      props.onFocus?.(e);
      formControl?.onFocus();
    };

    return <input {...props} ref={ref} onBlur={onBlur} onFocus={onFocus} />;
  }
);

export const InputLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export const FormInput = (props: InputProps) => {
  const { register } = useFormContext();

  return <Input {...props} {...register(props.name, { required: props.required })} />;
};
