// import { ThemedTitle } from '@components';
// import { FormContext } from '@contexts/form-context';
import {
  Anchor,
  Box,
  BoxProps,
  Button,
  Card,
  CardProps,
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
  RegisterFormTypes,
  RegisterPageProps,
  useActiveAuthProvider,
  useLink,
  useRegister,
  useRouterContext,
  useRouterType,
  useTranslate,
} from '@refinedev/core';
import { FormContext, FormPropsType, ThemedTitleV2 } from '@refinedev/mantine';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
// import { FormPropsType } from '../..';
import { cardStyles, layoutStyles, pageTitleStyles, titleStyles } from './styles';

type RegisterProps = RegisterPageProps<BoxProps, CardProps, FormPropsType>;

export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  providers,
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
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate('pages.register.errors.validEmail', 'Неверный email'),
      password: (value: any) => value === '',
    },
    ...useFormProps,
  });
  const { onSubmit, getInputProps } = form;

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({
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
                  id="register"
                  key={provider.name}
                  variant="default"
                  fullWidth
                  leftIcon={provider.icon}
                  onClick={() =>
                    register({
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
        {translate('pages.register.title', 'Sign up for your account')}
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
            return register(values);
          })}
        >
          <TextInput
            id="input-email"
            name="email"
            label={translate('pages.register.fields.email', 'Email')}
            placeholder={translate('pages.register.fields.email', 'Email')}
            {...getInputProps('email')}
          />
          <PasswordInput
            id="input-password"
            mt="md"
            name="password"
            label={translate('pages.register.fields.password', 'Password')}
            placeholder="●●●●●●●●"
            {...getInputProps('password')}
          />
          <Button
            id="button-register"
            mt="md"
            fullWidth
            size="md"
            type="submit"
            loading={isLoading}
          >
            {translate('pages.register.buttons.submit', 'Sign up')}
          </Button>

          {loginLink ?? (
            <Group mt="md" position="center">
              <Text size="xs">
                {translate('pages.register.buttons.haveAccount', 'Have an account?')}{' '}
                <Anchor id="button-login" component={ActiveLink as any} to="/login" weight={700}>
                  {translate('pages.register.signin', 'Sign in')}
                </Anchor>
              </Text>
            </Group>
          )}
        </form>
      </FormProvider>
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
