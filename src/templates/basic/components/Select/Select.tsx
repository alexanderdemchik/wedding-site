import React from 'react';
import { Select as BaseSelect, Option as BaseOption, SelectProps, SelectRootSlotProps } from '@mui/base';

const SelectButton = React.forwardRef(function Button<TValue extends object, Multiple extends boolean>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ...other } = props;

  return (
    <button {...other} ref={ref}>
      {other.children}
    </button>
  );
});

export const Select = React.forwardRef(function CustomSelect<TValue extends object, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: SelectButton,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

export const Option = BaseOption;
