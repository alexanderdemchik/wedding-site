import { useLocalStorage } from 'usehooks-ts';
import styles from './Dashboard.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../components/Input/Input';
import { AuthService } from '../../../../@generated/api/services/AuthService';
import { useMutation, useQueries, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { OpenAPI } from '../../../../@generated/api/core/OpenAPI';
import { FormsService } from '../../../../@generated/api/services/FormsService';

export const Dashboard = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const [error, setError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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

  return <></>;
};

export default Dashboard;
