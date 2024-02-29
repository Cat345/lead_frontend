import {
  Anchor,
  Box,
  BoxProps,
  Button,
  Card,
  CardProps,
  Group,
  Space,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  ForgotPasswordFormTypes,
  ForgotPasswordPageProps,
  useForgotPassword,
  useLink,
  useNotification,
  useRouterContext,
  useRouterType,
  useTranslate,
} from '@refinedev/core';
import { FormContext, ThemedTitleV2 } from '@refinedev/mantine';
import React from 'react';

import { cardStyles, layoutStyles, pageTitleStyles, titleStyles } from './styles';

type ResetPassworProps = ForgotPasswordPageProps<BoxProps, CardProps>;

/**
 * The forgotPassword type is a page that allows users to reset their passwords. You can use this page to reset your password.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#forgot-password} for more details.
 */
export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
  loginLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
}) => {
  const notifications = useNotification();
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
    },
    validate: {
      email: (value: any) =>
        /^\S+@\S+$/.test(value)
          ? null
          : translate('pages.forgotPassword.errors.validEmail', 'Invalid email address'),
    },
    ...useFormProps,
  });
  const { getInputProps, onSubmit } = form;

  const { mutate: forgotPassword, isLoading } = useForgotPassword<ForgotPasswordFormTypes>({
    mutationOptions: {
      onMutate() {
        notifications?.open!({
          message: '*Письмо может попасть в "Спам"',
          type: 'success',
          description: 'Мы отправили вам Email с инструкцией',
        });
      },
    },
  });

  const PageTitle =
    title === false ? null : (
      <div style={pageTitleStyles}>{title ?? <ThemedTitleV2 collapsed={false} />}</div>
    );

  const CardContent = (
    <Card style={cardStyles} {...(contentProps ?? {})}>
      <Title style={titleStyles} color={theme.colorScheme === 'dark' ? 'brand.5' : 'brand.8'}>
        {translate('pages.forgotPassword.title', 'Забыли пароль?')}
      </Title>
      <Space h="lg" />
      <FormProvider form={form}>
        <form
          onSubmit={onSubmit((values: any) => {
            if (onSubmitProp) {
              return onSubmitProp(values);
            }
            return forgotPassword(values);
          })}
        >
          <TextInput
            id="input-email"
            name="email"
            label={translate('pages.forgotPassword.fields.email', 'Email')}
            placeholder={translate('pages.forgotPassword.fields.email', 'Email')}
            {...getInputProps('email')}
          />

          {loginLink ?? (
            <Group mt="md" position={loginLink ? 'left' : 'right'}>
              <Text size="xs">
                {translate('pages.forgotPassword.haveAccount', 'Аккаунт уже существует?')}{' '}
                <Anchor id="button-enter" component={ActiveLink as any} to="/login" weight={700}>
                  {translate('pages.forgotPassword.signin', 'Войти')}
                </Anchor>
              </Text>
            </Group>
          )}
          <Button
            id="button-forgot-password"
            mt="lg"
            fullWidth
            size="md"
            type="submit"
            loading={isLoading}
          >
            {translate('pages.forgotPassword.buttons.submit', 'Отправить инструкцию')}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );

  return (
    <Box style={layoutStyles} {...(wrapperProps ?? {})}>
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
