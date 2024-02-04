import React, { useEffect, useRef, useState } from 'react';
import {
  Select as BaseSelect,
  SelectType,
  Option as BaseOption,
  SelectProps,
  SelectRootSlotProps,
  FormControl,
  useFormControlContext,
} from '@mui/base';
import styles from './Select.module.css';
import { useController } from 'react-hook-form';
import { FaAngleDown } from 'react-icons/fa6';
import { InputLabel } from '../Input/Input';

// eslint-disable-next-line @typescript-eslint/ban-types
const SelectButton = React.forwardRef(function Button<TValue extends {}, Multiple extends boolean>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, ...other } = props;

  return (
    <button {...other} ref={ref} className={styles.button}>
      {other.children}
      <FaAngleDown />
    </button>
  );
});

// eslint-disable-next-line @typescript-eslint/ban-types
type ISelectProps<TValue extends {}, Multiple extends boolean> = SelectProps<TValue, Multiple> & {
  label: string;
  areOptionsEqual?: (a: TValue, b: TValue) => boolean;
};

// @ts-ignore
const CustomSelect: SelectType = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/ban-types
  (props, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const formControl = useFormControlContext();

    const onBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      formControl?.onBlur?.();
      props?.onBlur?.(e);
    };

    const onFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      formControl?.onFocus?.();
      props?.onFocus?.(e);
    };

    return <BaseSelect {...props} ref={ref} onBlur={onBlur} onFocus={onFocus} />;
  }
);

export const Select = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/ban-types
  <TValue extends {}, Multiple extends boolean>(
    { label, ...props }: ISelectProps<TValue, Multiple>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const [menuMinWidth, setMenuMinWidth] = useState(100);

    const slots = {
      root: SelectButton,
      ...props.slots,
    };

    const slotsProps = {
      popper: {
        className: styles.popper,
        style: {
          minWidth: `${menuMinWidth}px`,
        },
      },
      listbox: {
        className: styles.listbox,
      },
    };

    useEffect(() => {
      innerRef.current?.offsetWidth && setMenuMinWidth(innerRef.current?.offsetWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [innerRef.current]);

    return (
      <FormControl className={styles.container}>
        <InputLabel htmlFor={props.name!}>{label}</InputLabel>
        <CustomSelect
          {...props}
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          slots={slots}
          slotProps={slotsProps}
        />
      </FormControl>
    );
  }
);

// eslint-disable-next-line @typescript-eslint/ban-types
export const FormSelect = <TValue extends {}, Multiple extends boolean>(props: ISelectProps<TValue, Multiple>) => {
  const { field } = useController({ name: props.name! });

  return (
    // @ts-ignore
    <Select
      {...props}
      value={field.value}
      onChange={(_e, v) => {
        field.onChange(v);
      }}
    />
  );
};

export const Option = BaseOption;
