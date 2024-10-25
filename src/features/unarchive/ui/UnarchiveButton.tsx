import { ActionIcon, Tooltip } from '@mantine/core';
import { useInvalidate, useUpdate } from '@refinedev/core';
import { IconArrowBackUp } from '@tabler/icons';

export const UnarchiveButton = ({
  resource,
  recordItemId,
  svgIconProps,
  ...props
}: {
  resource: string;
  recordItemId: string;
  svgIconProps?: object;
}) => {
  const { mutateAsync } = useUpdate();
  const invalidate = useInvalidate();

  const unarcvhie = () => {
    mutateAsync({ resource, id: recordItemId, values: { isArchived: false } }).then(() => {
      invalidate({ invalidates: ['all'], resource });
    });
  };

  return (
    <Tooltip label="Разархивировать">
      <ActionIcon variant="default" onClick={unarcvhie} {...props}>
        <IconArrowBackUp size={18} {...svgIconProps} />
      </ActionIcon>
    </Tooltip>
  );
};
