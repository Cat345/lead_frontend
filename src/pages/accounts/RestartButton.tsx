// import { mapButtonVariantToActionIconVariant } from '@definitions/button';
import { ActionIcon } from '@mantine/core';
import { AccessControlContext, useCan, useResource, useTranslate } from '@refinedev/core';
import { mapButtonVariantToActionIconVariant, ShowButtonProps } from '@refinedev/mantine';
import { RefineButtonClassNames, RefineButtonTestIds } from '@refinedev/ui-types';
import { IconRefresh } from '@tabler/icons';
import React, { useContext } from 'react';

export const RestartButton: React.FC<ShowButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  accessControl,
  svgIconProps,
  onClick,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ?? accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ?? accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { id, resource } = useResource(resourceNameFromProps ?? resourceNameOrRouteName);

  const { data } = useCan({
    resource: resource?.name,
    action: 'restart',
    params: { id: recordItemId ?? id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
      cacheTime: 0,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return '';
    else if (data?.reason) return data.reason;
    else return translate('buttons.notAccessTitle', "You don't have permission to access");
  };

  const { variant } = rest;

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }
  return (
    <ActionIcon
      onClick={() => onClick!(rest.meta.id)}
      {...(variant
        ? {
            variant: mapButtonVariantToActionIconVariant(variant),
          }
        : { variant: 'default' })}
      disabled={data?.can === false}
      title={disabledTitle()}
      data-testid={RefineButtonTestIds.ShowButton}
      className={RefineButtonClassNames.ShowButton}
    >
      <IconRefresh size={18} {...svgIconProps} />
    </ActionIcon>
  );
};
