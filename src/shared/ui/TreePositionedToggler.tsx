import { SegmentedControl } from '@mantine/core';
import { IconMoodEmpty, IconMoodSad, IconMoodSmile } from '@tabler/icons';
import { ReactNode, useState } from 'react';

interface TreePositionedTogglerProps {
  value: string;
  onChange: (value: string) => void;
  tooltips?: {
    all?: string;
    active?: string;
    inactive?: string;
  };
  icons?: {
    all?: ReactNode;
    active?: ReactNode;
    inactive?: ReactNode;
  };
  colors?: {
    active?: string;
    inactive?: string;
  };
}

export const TreePositionedToggler = ({
  value: initialValue,
  onChange,
}: TreePositionedTogglerProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SegmentedControl
      color={value === 'good' ? 'green' : value === 'bad' ? 'red' : 'gray'}
      value={value}
      onChange={(value) => {
        setValue(value);
        onChange(value);
      }}
      size="xs"
      data={[
        {
          label: (
            <div>
              <IconMoodSad size={14} style={{ marginTop: 5 }} />
            </div>
          ),
          value: 'bad',
        },
        {
          label: (
            <div>
              <IconMoodEmpty size={14} style={{ marginTop: 5 }} />
            </div>
          ),
          value: 'neutral',
        },
        {
          label: (
            <div>
              <IconMoodSmile size={14} style={{ marginTop: 5 }} />
            </div>
          ),
          value: 'good',
        },
      ]}
    />
  );
};
