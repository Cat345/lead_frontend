import { Checkbox, Flex, Select, TextInput } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { Create, useForm } from '@refinedev/mantine';
import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

import { Tour } from '../../components/Tour/Tour';
import { ParseType } from '../../models/Keyword';
import { isEmpty } from '../../shared/validations/isEmpty';

const parseTypeOptions: {
  value: ParseType;
  label: string;
}[] = [
  {
    value: 'equals',
    label: 'Равен',
  },
  {
    value: 'contains',
    label: 'Содержит',
  },
  {
    value: 'startsWith',
    label: 'Начинается с',
  },
  {
    value: 'endsWith',
    label: 'Заканчивается',
  },
];

const DEFAULT_IS_ACTIVE = true;
export default function KeywordCreate() {
  const translate = useTranslate();
  const [parseType, setParseType] = useLocalStorage<ParseType>('parseType', 'equals', {
    syncData: true,
  });

  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
    setFieldValue,
    values,
  } = useForm({
    initialValues: { name: '', isActive: DEFAULT_IS_ACTIVE, parseType },
    validate: {
      name: (name) => (isEmpty(name) ? 'Название не может быть пустым' : null),
    },
  });

  useEffect(() => {
    setFieldValue('parseType', parseType);
  }, [parseType]);
  const handleChangeParseType = (value: ParseType) => {
    setParseType(value);
  };

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      wrapperProps={{
        style: {
          paddingBottom: '200px',
        },
      }}
    >
      <Tour />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Select
          value={values.parseType}
          data={parseTypeOptions}
          onChange={handleChangeParseType}
          mt="sm"
          mr="xs"
          dropdownPosition="bottom"
          style={{ width: '180px' }}
        />
        <TextInput
          styles={{
            root: {
              width: '100%',
            },
          }}
          id="input-name"
          mt="sm"
          label={translate('keywords.fields.name')}
          {...getInputProps('name')}
          required={true}
        />
      </div>
      <Checkbox
        id="checkbox-is-active"
        defaultChecked={DEFAULT_IS_ACTIVE}
        mt="sm"
        label={translate('keywords.fields.isActive')}
        {...getInputProps('isActive')}
      />
    </Create>
  );
}
