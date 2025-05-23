import {
  Box,
  BoxProps,
  Button,
  Card,
  CardProps,
  Space,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  UpdatePasswordFormTypes,
  UpdatePasswordPageProps,
  useActiveAuthProvider,
  useTranslate,
  useUpdatePassword,
} from '@refinedev/core';
import { FormContext, FormPropsType, ThemedTitleV2 } from '@refinedev/mantine';
import { useParams } from 'react-router-dom';

import { cardStyles, layoutStyles, pageTitleStyles, titleStyles } from './styles';

type UpdatePassworProps = UpdatePasswordPageProps<BoxProps, CardProps, FormPropsType>;

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/#update-password} for more details.
 */
export default function UpdatePasswordPage({
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
}: UpdatePassworProps) {
  const { uuid } = useParams();
  const theme = useMantineTheme();
  const { useForm, FormProvider } = FormContext;
  const { onSubmit: onSubmitProp, ...useFormProps } = formProps || {};
  const translate = useTranslate();

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value: any) => value === '',
      confirmPassword: (value: any, values: any) =>
        value !== values.password
          ? translate(
              'pages.updatePassword.errors.confirmPasswordNotMatch',
              'Passwords do not match'
            )
          : null,
    },
    ...useFormProps,
  });
  const { getInputProps, onSubmit } = form;

  const authProvider = useActiveAuthProvider();
  const { mutate: updatePassword, isLoading } = useUpdatePassword<UpdatePasswordFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle =
    title === false ? null : (
      <div style={pageTitleStyles}>{title ?? <ThemedTitleV2 collapsed={false} />}</div>
    );

  const CardContent = (
    <Card style={cardStyles} {...(contentProps ?? {})}>
      <Title style={titleStyles} color={theme.colorScheme === 'dark' ? 'brand.5' : 'brand.8'}>
        {translate('pages.updatePassword.title', 'Set New Password')}
      </Title>
      <Space h="lg" />
      <FormProvider form={form}>
        <form
          onSubmit={onSubmit((values: any) => {
            if (onSubmitProp) {
              return onSubmitProp(values);
            }
            return updatePassword({ ...values, uuid });
          })}
        >
          <TextInput
            name="password"
            type="password"
            label={translate('pages.updatePassword.fields.password', 'New Password')}
            placeholder="●●●●●●●●"
            {...getInputProps('password')}
          />
          <TextInput
            mt="md"
            name="confirmPassword"
            type="password"
            label={translate('pages.updatePassword.fields.confirmPassword', 'Confirm New Password')}
            placeholder="●●●●●●●●"
            {...getInputProps('confirmPassword')}
          />
          <Button mt="lg" fullWidth size="md" type="submit" loading={isLoading}>
            {translate('pages.updatePassword.buttons.submit', 'Update')}
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
}
