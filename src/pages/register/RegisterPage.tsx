// import { ThemedTitle } from '@components';
// import { FormContext } from '@contexts/form-context';
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
  Input,
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
import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

import { Tour } from '../../components/Tour/Tour';
import { useUtmStore } from '../../features/utm/useUtmStore';
// import { FormPropsType } from '../..';
import { cardStyles, layoutStyles, pageTitleStyles, titleStyles } from './styles';
import { isPhoneValid } from '../../shared/validations/isPhoneValid';

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
  const [isConfirmPolicy, setIsConfirmPolicy] = useState(true);
  const [isMailingConfirmed, setIsMailingConfirmed] = useState(false);

  const utm = useUtmStore((store) => store.utm);
  const referral = useUtmStore((store) => store.referral);

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
      phone: '',
      password: '',
      check: '',
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate('pages.register.errors.validEmail', 'Неверный email'),
      password: (value: string) => value === '',
      phone: (value: string) => isPhoneValid(value),
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
            const registerValues = {
              ...values,
              utm,
              referral,
              isMailingConfirmed,
            };
            if (onSubmitProp) {
              return onSubmitProp(registerValues);
            }
            return register(registerValues);
          })}
        >
          <TextInput
            id="input-email"
            name="email"
            label={translate('pages.register.fields.email', 'Email')}
            placeholder={translate('pages.register.fields.email', 'Email')}
            {...getInputProps('email')}
            required
          />
          <Input.Wrapper label="Телефон" mt="sm" required {...getInputProps('phone')}>
            <Input
              {...getInputProps('phone')}
              id="input-phone"
              name="phone"
              component={IMaskInput}
              mask="+0 (000) 000-00-00"
              placeholder="+7 (...) ...-..-.."
            />
          </Input.Wrapper>
          <PasswordInput
            required
            id="input-password"
            mt="sm"
            name="password"
            label={translate('pages.register.fields.password', 'Password')}
            placeholder="●●●●●●●●"
            {...getInputProps('password')}
          />
          <TextInput
            style={{ position: 'absolute', left: '-9500px' }}
            label="check"
            placeholder="check"
            {...getInputProps('check')}
          />
          <Checkbox
            required
            size="xs"
            mt="sm"
            error={!isConfirmPolicy ? 'Обязательное поле' : null}
            label={
              <Text size="xs">
                Согласен с политикой конфиденциальности и офертой
                {/* <Anchor href="https://mantine.dev" target="_blank" inherit>
                  terms and conditions
                </Anchor> */}
              </Text>
            }
            checked={isConfirmPolicy}
            onChange={(e) => setIsConfirmPolicy(e.target.checked)}
          />
          <Checkbox
            size="xs"
            mt="xs"
            label="Подписаться на новости"
            checked={isMailingConfirmed}
            onChange={(e) => setIsMailingConfirmed(e.target.checked)}
          />
          <Box>
            <Button
              disabled={!isConfirmPolicy}
              id="button-register"
              mt="md"
              fullWidth
              size="md"
              type="submit"
              loading={isLoading}
            >
              {translate('pages.register.buttons.submit', 'Sign up')}
            </Button>
          </Box>

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
