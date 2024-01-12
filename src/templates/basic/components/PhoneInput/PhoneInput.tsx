import 'react-international-phone/style.css';
import { PhoneInput as LibPhoneInput, PhoneInputProps } from 'react-international-phone';
import { InputLabel } from '../Input/Input';
import { useController } from 'react-hook-form';
import { FormControl, useFormControlContext } from '@mui/base';
import styles from './PhoneInput.module.css';

export const PhoneInput = ({
  label,
  name,
  ...props
}: Omit<PhoneInputProps, 'name'> & { name: string; label: string }) => {
  const { field } = useController({ name });

  return (
    <FormControl className={styles.wrapper}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <PhoneInputBase
        className={styles.input}
        defaultCountry="by"
        {...props}
        name={name}
        value={field.value}
        placeholder="+375 (00) 000 00 00"
        onChange={(phone) => field.onChange(phone)}
      />
    </FormControl>
  );
};

const PhoneInputBase = (props: PhoneInputProps) => {
  const formControl = useFormControlContext();

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    formControl?.onBlur?.();
    props?.onBlur?.(e);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    formControl?.onFocus?.();
    props?.onFocus?.(e);
  };

  return <LibPhoneInput defaultCountry="by" onBlur={onBlur} onFocus={onFocus} {...props} />;
};
