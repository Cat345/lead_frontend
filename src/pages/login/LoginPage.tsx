import {
  Anchor,
  Box,
  BoxProps,
  Button,
  Card,
  CardProps,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  LoginFormTypes,
  LoginPageProps,
  useActiveAuthProvider,
  useLink,
  useLogin,
  useRouterContext,
  useRouterType,
  useTranslate,
} from '@refinedev/core';
import { FormContext, FormPropsType, ThemedTitleV2 } from '@refinedev/mantine';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { cardStyles, layoutStyles, pageTitleStyles, titleStyles } from './cardStyles';

type LoginProps = LoginPageProps<BoxProps, CardProps, FormPropsType>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
}) => {
  const theme = useMantineTheme();
  const { useForm, FormProvider } = FormContext;
  const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate('pages.login.errors.validEmail', 'Invalid email address'),
      password: (value: any) => value === '',
    },
    ...useFormProps,
  });
  const { onSubmit, getInputProps } = form;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle =
    title === false ? null : (
      <div style={pageTitleStyles}>{title ?? <ThemedTitleV2 collapsed={false} />}</div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={8}>
            {providers.map((provider) => {
              return (
                <Button
                  id="button-login"
                  key={provider.name}
                  variant="default"
                  fullWidth
                  leftIcon={provider.icon}
                  onClick={() =>
                    login({
                      providerName: provider.name,
                    })
                  }
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          <Divider my="md" labelPosition="center" label={translate('pages.login.divider', 'or')} />
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card style={cardStyles} {...(contentProps ?? {})}>
      <Title style={titleStyles} color={theme.colorScheme === 'dark' ? 'brand.5' : 'brand.8'}>
        {translate('pages.login.title', 'Войти в аккаунт')}
      </Title>
      <Space h="sm" />
      <Space h="lg" />
      {renderProviders()}
      <FormProvider form={form}>
        <form
          onSubmit={onSubmit((values: any) => {
            if (onSubmitProp) {
              return onSubmitProp(values);
            }
            return login(values);
          })}
        >
          <TextInput
            id="input-email"
            name="email"
            label={translate('pages.login.fields.email', 'Email')}
            placeholder={translate('pages.login.fields.email', 'Email')}
            {...getInputProps('email')}
          />
          <PasswordInput
            id="input-password"
            name="password"
            mt="md"
            label={translate('pages.login.fields.password', 'Password')}
            placeholder="●●●●●●●●"
            {...getInputProps('password')}
          />
          <Box
            mt="md"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {rememberMe ?? (
              <Checkbox
                id="button-remember-me"
                label={translate('pages.login.buttons.rememberMe', 'Запомнить меня')}
                size="xs"
                {...getInputProps('remember', {
                  type: 'checkbox',
                })}
              />
            )}
          </Box>
          <Button id="button-enter" mt="md" fullWidth size="md" type="submit" loading={isLoading}>
            {translate('pages.login.signin', 'Войти')}
          </Button>
        </form>
      </FormProvider>

      <Group mt="md">
        <Text size="xs">
          <Anchor
            id="button-forgot-password"
            component={ActiveLink as any}
            to="/forgot-password"
            weight={700}
          >
            {translate('pages.login.forgotPassword', 'Забыли пароль?')}
          </Anchor>
        </Text>
        <Text size="xs">
          {translate('pages.login.buttons.noAccount')}{' '}
          <Anchor id="button-register" component={ActiveLink as any} to="/register" weight={700}>
            {translate('pages.login.signup', 'Зарегистрироваться')}
          </Anchor>
        </Text>
      </Group>
    </Card>
  );

  return (
    <Box style={layoutStyles} {...(wrapperProps ?? {})}>
      <Tour />
      {renderContent ? (
        renderContent(CardContent, PageTitle)
      ) : (
        <>
          {PageTitle}
          {CardContent}
        </>
      )}
    </Box>
  );
};
