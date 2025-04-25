import { Button, Group, InputBase, Stepper, Title } from '@mantine/core';
import { BaseKey, useCreate, useTranslate, useUpdate } from '@refinedev/core';
import { useForm } from '@refinedev/mantine';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';

import { Tour } from '../../components/Tour/Tour';
import { isPhoneValid } from '../../shared/validations/isPhoneValid';

export default function AccountCreate() {
  const navigate = useNavigate();
  const [createdAccountId, setCreatedAccontId] = useState<BaseKey | null>(0);
  const translate = useTranslate();
  const { getInputProps, values } = useForm({
    initialValues: { phone: '', type: 'Telegram', status: 'active' },
    validate: {
      phone: isPhoneValid,
    },
  });
  const { getInputProps: getCodeInputProps, values: codeValues } = useForm({
    initialValues: { code: null },
  });
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const { mutateAsync: create } = useCreate();
  const { mutateAsync: update } = useUpdate();
  const nextStep = async () => {
    setLoading(true);

    if (active === 0) {
      const { data: createdAccount } = await create({
        resource: 'accounts',
        values,
        successNotification: false,
        errorNotification: {
          type: 'error',
          message: 'Ошибка',
        },
      });
      setCreatedAccontId(createdAccount?.id ?? null);
    }
    if (active === 1) {
      if (!createdAccountId) return;

      try {
        await update({
          resource: 'accounts',
          id: createdAccountId,
          values: {
            code: codeValues.code,
          },
          successNotification: false,
        });
        navigate('/accounts');
      } catch (error) {
        console.error(error);
      }
    }

    setActive((current) => (current < 1 ? current + 1 : current));
    setLoading(false);
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const steps = [
    {
      label: 'Шаг первый:',
      description: 'Ввести телефон',
      title: 'Введите номер телефона от телеграм аккаунта',
      component: (
        <InputBase
          id="input-phone"
          autoFocus
          component={IMaskInput}
          mask="+7 (000) 000-00-00"
          label={translate('accounts.fields.phone')}
          {...getInputProps('phone')}
        />
      ),
    },
    {
      label: 'Шаг второй:',
      description: 'Ввести код',
      title: 'Введите код из Telegram:',
      component: (
        <InputBase
          id="input-code"
          autoFocus
          component={IMaskInput}
          mask="000000"
          label="Код"
          {...getCodeInputProps('code')}
        />
      ),
    },
  ];
  const isFirstStep = active === 0;
  return (
    <div>
      <Tour />
      <Stepper
        mt="lg"
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        // mih={'40vh'}
        maw={'50vw'}
        mx="auto"
        allowNextStepsSelect={false}
      >
        {steps.map((step) => (
          <Stepper.Step key={step.title} label={step.label} description={step.description}>
            <Title order={5} mb="sm">
              {step.title}
            </Title>
            {step.component}
          </Stepper.Step>
        ))}
      </Stepper>
      <Group position="right" mt="lg">
        {!isFirstStep && (
          <Button variant="default" onClick={prevStep} id="button-back">
            Назад
          </Button>
        )}

        <Button onClick={nextStep} id="button-forward" loading={isLoading}>
          Вперёд
        </Button>
      </Group>
    </div>
  );
}
