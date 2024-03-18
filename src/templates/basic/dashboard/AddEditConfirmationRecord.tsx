import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../components/Input/Input';
import { PhoneInput } from '../components/PhoneInput/PhoneInput';
import { FormSelect, Option } from '../components/Select/Select';
import { FormDrinkSelector } from '../components/DrinkSelector/DrinkSelector';
import { FormCheckbox } from '../components/Checkbox/Checkbox';
import { FormDto } from '../../../../@generated/api/models/FormDto';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { FormsService } from '../../../../@generated/api/services/FormsService';
import { queryClient } from '../../../main';

interface IAddEditConfirmationRecordProps {
  open: boolean;
  onClose: () => void;
  edit?: FormDto;
}

export const AddEditConfirmationRecord = (props: IAddEditConfirmationRecordProps) => {
  const methods = useForm<FormDto>({
    defaultValues: {
      name: '',
      phone: '',
      confirmation: 'Приду',
      drinkPreferences: [] as string[],
      transfer: false,
      quantity: 1,
      childsQuantity: 0,
      comment: '',
      validated: false,
    },
  });

  useEffect(() => {
    methods.reset(
      {
        name: '',
        phone: '',
        confirmation: 'Приду',
        drinkPreferences: [] as string[],
        transfer: false,
        quantity: 1,
        childsQuantity: 0,
        comment: '',
        validated: false,
      },
      { keepValues: false }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  useEffect(() => {
    props.edit && methods.reset({ ...props.edit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit]);

  const saveMutation = useMutation({
    mutationFn: ({ data, id }: { data: FormDto; id: string }) => {
      if (id) {
        return FormsService.formsControllerUpdate(id, data);
      }

      return FormsService.formsControllerCreate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      props.onClose();
    },
  });

  return (
    <Dialog open={props.open} onClose={props.onClose} TransitionProps={{ unmountOnExit: true }}>
      <DialogTitle>Новая Запись</DialogTitle>
      <DialogContent sx={{ width: '545px' }}>
        <form
          id="form"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
          onSubmit={methods.handleSubmit(() => {
            saveMutation.mutate({ data: methods.getValues(), id: props.edit?.id });
          })}
        >
          <FormProvider {...methods}>
            {saveMutation.error && 'Произошла ошибка, попробуйте снова'}
            <FormInput name="name" label="Ваше имя" placeholder="Имя Фамилия" required />
            <PhoneInput name="phone" label="Телефон" />
            <FormSelect name="confirmation" label="Подтверждение присутствия">
              <Option value={'Приду'}>Приду</Option>
              <Option value={'Приду не один(не одна)'}>Приду не один(не одна)</Option>
              <Option value={'К сожалению не смогу'}>К сожалению не смогу</Option>
            </FormSelect>
            <FormSelect name="quantity" label="Количество гостей">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                <Option value={el}>{el}</Option>
              ))}
            </FormSelect>
            <FormSelect name="childsQuantity" label="Количество детей">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                <Option value={el}>{el}</Option>
              ))}
            </FormSelect>
            <FormDrinkSelector label="Что предпочитаете пить?" name="drinkPreferences" />
            <TextField multiline fullWidth placeholder="Комментарий" {...methods.register('comment')} />
            <FormCheckbox name="transfer" label="Нужен трансфер" />
            <FormCheckbox name="validated" label="Проверено вручную?" />
          </FormProvider>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="form">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
