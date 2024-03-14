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
import { AgChartOptions } from 'ag-charts-community';
import { queryClient } from '../../../main';
import { FormDto } from '../../../../@generated/api/models/FormDto';
import { Button, Checkbox } from '@mui/material';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    },
    { field: 'name', filter: true, minWidth: 200 },
    { field: 'phone', filter: true },
    { field: 'confirmation', filter: true },
    { field: 'quantity', filter: 'agNumberColumnFilter' },
    { field: 'drinkPreferences', filter: true },

    {
      field: 'transfer',
      filter: true,
      type: 'boolean',
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
      field: 'ipAddress',
      filter: true,
    },
    {
      pinned: 'right',
      cellRenderer: ({ node }) => {
        return (
          <div className={styles['table-actions']}>
            <Button variant="text">Edit</Button>
            <Button
              variant="text"
              onClick={() => {
                if (window.confirm('Вы уверены что хотите удалить запись?')) {
                  deleteFormMutation.mutate(node.data.id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
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
        (curr.drinkPreferences || []).forEach((drink) => {
          acc[drink] = (acc[drink] || 0) + 1;
        });

        return acc;
      },
      {} as Record<string, number>
    );

    return {
      data: Object.keys(numberByDrink).map((drink) => ({ asset: drink, amount: numberByDrink[drink] })),
      title: {
        text: 'Drink Preferences',
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

  useEffect(() => {
    window.addEventListener('resize', () => gridRef.current?.api.sizeColumnsToFit());
    // cleanup
    return () => {
      window.removeEventListener('resize', () => gridRef.current?.api.sizeColumnsToFit());
    };
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
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: '50vh' }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={forms.data || []}
          columnDefs={colDefs}
          autoSizeStrategy={autoSizeStrategy}
          defaultColDef={defaultColDef}
        />
      </div>

      <AgChartsReact options={drinkPreferencesChartData} />
    </div>
  );
};

export default Dashboard;
