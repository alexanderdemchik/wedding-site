import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'ag-grid-enterprise';
import { useLocalStorage } from 'usehooks-ts';
import styles from './Dashboard.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../components/Input/Input';
import { AuthService } from '../../../../@generated/api/services/AuthService';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { OpenAPI } from '../../../../@generated/api/core/OpenAPI';
import { FormsService } from '../../../../@generated/api/services/FormsService';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  SizeColumnsToContentStrategy,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgChartsReact } from 'ag-charts-react';
import { AgCartesianChartOptions, AgChartOptions } from 'ag-charts-community';
import { queryClient } from '../../../main';
import { FormDto } from '../../../../@generated/api/models/FormDto';
import { Checkbox, Fab, Grid, IconButton, Stack, Typography } from '@mui/material';
import { FaPencil, FaPlus, FaRegTrashCan } from 'react-icons/fa6';
import { AddEditConfirmationRecord } from './AddEditConfirmationRecord';
import dayjs from 'dayjs';

export const Dashboard = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const gridRef = useRef<AgGridReact<FormDto>>(null);

  const form = useForm({
    defaultValues: {
      password: '',
    },
  });

  const auth = useMutation({
    mutationFn: (password: string) => {
      return AuthService.authControllerAuth({ password });
    },
  });

  const forms = useQuery({
    queryFn: () => {
      return FormsService.formsControllerFindAll();
    },
    queryKey: 'forms',
    enabled: authenticated,
  });

  const deleteFormMutation = useMutation({
    mutationFn: async (id: string) => {
      return FormsService.formsControllerRemove(id);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<FormDto[]>('forms', (old) => old.filter((el) => el.id !== id));
    },
  });

  const handleSubmit = (password: string) => {
    auth.mutate(password, {
      onSuccess: () => {
        setToken(password);
        setAuthenticated(true);
        OpenAPI.HEADERS = { Authorization: password };
      },
      onError: () => {
        setError(true);
      },
    });
  };

  useEffect(() => {
    if (token) {
      auth.mutate(token, {
        onSuccess: () => {
          setAuthenticated(true);
          OpenAPI.HEADERS = { Authorization: token };
        },
        onError: () => {
          setToken('');
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    {
      cellRenderer: ({ rowIndex }) => {
        return rowIndex + 1;
      },
      headerName: '#',
      sortable: false,
      width: 40,
      maxWidth: 40,
      suppressColumnsToolPanel: true,
      suppressFiltersToolPanel: true,
      suppressHeaderFilterButton: true,
      suppressHeaderMenuButton: true,
    },
    { field: 'name', filter: true, minWidth: 200, headerName: 'Имя' },
    { field: 'phone', filter: true, headerName: 'Телефон', tooltipField: 'phone' },
    { field: 'confirmation', filter: true, headerName: 'Подтверждение' },
    { field: 'quantity', filter: 'agNumberColumnFilter', headerName: 'Кол-во' },
    { field: 'childsQuantity', filter: 'agNumberColumnFilter', headerName: 'Дети' },
    { field: 'drinkPreferences', filter: true, headerName: 'Напитки', tooltipField: 'drinkPreferences' },
    {
      field: 'transfer',
      filter: true,
      type: 'boolean',
      headerName: 'Трансфер',
      cellRenderer: ({ node }) => {
        return (
          <div className={styles['table-checkbox-wrapper']}>
            <Checkbox checked={!!node.data.transfer} size="small" />
          </div>
        );
      },
    },
    {
      field: 'validated',
      filter: true,
      headerName: 'Проверено',
      type: 'boolean',
      cellRenderer: ({ node }) => {
        return (
          <div className={styles['table-checkbox-wrapper']}>
            <Checkbox checked={!!node.data.validated} size="small" />
          </div>
        );
      },
    },
    {
      field: 'comment',
      headerName: 'Комментарий',
      tooltipField: 'comment',
    },
    {
      field: 'createdAt',
      headerName: 'Дата',
      type: 'dateString',
    },
    {
      field: 'ipAddress',
      headerName: 'ip',
      filter: true,
    },
    {
      pinned: 'right',
      cellRenderer: ({ node }) => {
        return (
          <div className={styles['table-actions']}>
            <IconButton
              size="small"
              onClick={() => {
                setIsAddEditModalOpen(true);
                setEditRecord(node.data);
              }}
            >
              <FaPencil />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                if (window.confirm('Вы уверены что хотите удалить запись?')) {
                  deleteFormMutation.mutate(node.data.id);
                }
              }}
            >
              <FaRegTrashCan />
            </IconButton>
          </div>
        );
      },
      minWidth: 80,
      maxWidth: 80,
    },
  ]);

  const autoSizeStrategy = useMemo<
    SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: 'fitGridWidth',
      defaultMinWidth: 120,
    };
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 120,
    };
  }, []);

  const drinkPreferencesChartData = useMemo<AgChartOptions>(() => {
    const numberByDrink = (forms.data || []).reduce(
      (acc, curr) => {
        if (curr.confirmation !== 'К сожалению не смогу') {
          (curr.drinkPreferences || []).forEach((drink) => {
            acc[drink] = (acc[drink] || 0) + 1;
          });
        }

        return acc;
      },
      {} as Record<string, number>
    );

    return {
      theme: 'ag-material',
      data: Object.keys(numberByDrink).map((drink) => ({ asset: drink, amount: numberByDrink[drink] })),
      title: {
        text: 'Напитки',
      },
      series: [
        {
          type: 'donut',
          calloutLabelKey: 'asset',
          angleKey: 'amount',
          innerRadiusRatio: 0.7,
          tooltip: {
            enabled: true,
            renderer: (params) => {
              return {
                title: params.datum.asset,
                content: params.datum.amount,
              };
            },
          },
        },
      ],
    };
  }, [forms.data]);

  const confirmationsPerDayChartData = useMemo<AgCartesianChartOptions>(() => {
    const getData = () => {
      const confirmationsNumByDay = (forms.data || []).reduce(
        (acc, curr) => {
          const formattedDate = dayjs(curr.createdAt).format('DD-MM');

          acc[formattedDate] = (acc[formattedDate] || 0) + 1;

          return acc;
        },
        {} as Record<string, number>
      );

      return Object.entries(confirmationsNumByDay).map(([date, value]) => ({
        date,
        value,
      }));
    };

    return {
      theme: 'ag-material',
      title: {
        text: 'Подтверждения',
      },
      data: getData(),
      series: [
        {
          type: 'area',
          xKey: 'date',
          yKey: 'value',
          yName: 'Кол-во подтверждений',
          stroke: 'blue',
          strokeWidth: 3,
          fill: 'lightBlue',
          marker: {
            enabled: true,
            fill: 'blue',
          },
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
        },
        {
          type: 'category',
          position: 'bottom',
        },
      ],
    };
  }, [forms.data]);

  useEffect(() => {
    window.addEventListener('resize', () => gridRef.current?.api.sizeColumnsToFit());
    // cleanup
    return () => {
      window.removeEventListener('resize', () => gridRef.current?.api.sizeColumnsToFit());
    };
  }, []);

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<FormDto | undefined>(undefined);

  const peopleCount = useMemo(() => {
    return (forms.data || []).reduce(
      (acc, curr) => {
        if (curr.confirmation === 'К сожалению не смогу') {
          acc.notPresented += 1;
        } else {
          acc.adults += (curr.quantity || 1) - (curr.childsQuantity || 0);
          acc.childs += curr.childsQuantity || 0;

          if (curr.transfer) {
            acc.needTransfer += curr.quantity || 1;
          }
        }

        return acc;
      },
      { adults: 0, childs: 0, notPresented: 0, needTransfer: 0 }
    );
  }, [forms.data]);

  const memoizedData = useMemo(() => [...(forms.data || [])].reverse(), [forms.data]);

  const todayConfirmationsNumber = useMemo(() => {
    return (forms.data || []).filter((el) => dayjs(el.createdAt).isSame(dayjs(), 'day')).reduce((acc) => acc + 1, 0);
  }, []);

  if (!authenticated) {
    return (
      <div className={styles['login-form-wrapper']}>
        <div className={styles['login-form']}>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(({ password }) => {
                handleSubmit(password);
              })}
            >
              <FormInput
                name="password"
                type="password"
                label="Password"
                required
                wrapperClassName={styles.password}
                width={'100%'}
              />
              {!!error && <div className={styles['error']}>Invalid password</div>}
              <button type="submit" className={styles.button}>
                Sign In
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['dashboard-wrapper']}>
      <div className={styles['bg-filter']} />
      <AddEditConfirmationRecord
        open={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        edit={editRecord}
      />
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: '50vh', position: 'relative' }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={memoizedData}
          columnDefs={colDefs}
          autoSizeStrategy={autoSizeStrategy}
          defaultColDef={defaultColDef}
          enableBrowserTooltips
        />
        <Fab
          className={styles.fab}
          color="primary"
          size="small"
          onClick={() => {
            setEditRecord(undefined);
            setIsAddEditModalOpen(true);
          }}
        >
          <FaPlus />
        </Fab>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            <Stack direction="row" spacing={1}>
              <div>Всего: {peopleCount.adults + peopleCount.childs}</div>
              <div>Взрослые: {peopleCount.adults}</div>
              <div>Дети: {peopleCount.childs}</div>
              <div>Не придут: {peopleCount.notPresented}</div>
              <div>Нужен трансфер: {peopleCount.needTransfer}</div>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AgChartsReact options={drinkPreferencesChartData} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AgChartsReact options={confirmationsPerDayChartData} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} display={'flex'}>
          <div className={styles['today-confirmations']}>
            <div className={styles['today-confirmations-title']}>За сегодня</div>
            <div className={styles['today-confirmations-body']}>+ {todayConfirmationsNumber}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
