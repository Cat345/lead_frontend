// import { mapButtonVariantToActionIconVariant } from '@definitions/button';
import { ActionIcon, Anchor, Button } from '@mantine/core';
import {
  AccessControlContext,
  useCan,
  useLink,
  useNavigation,
  useResource,
  useRouterContext,
  useRouterType,
  useTranslate,
} from '@refinedev/core';
import { mapButtonVariantToActionIconVariant, ShowButtonProps } from '@refinedev/mantine';
import { RefineButtonClassNames, RefineButtonTestIds } from '@refinedev/ui-types';
import { IconEye, IconRefresh } from '@tabler/icons';
import React, { useContext } from 'react';

export const RestartButton: React.FC<ShowButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
  recordItemId,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ?? accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ?? accessControlContext.options.buttons.hideIfUnauthorized;
  const { showUrl: generateShowUrl } = useNavigation();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const translate = useTranslate();

  const { id, resource } = useResource(resourceNameFromProps ?? resourceNameOrRouteName);

  const { data } = useCan({
    resource: resource?.name,
    action: 'restart',
    params: { id: recordItemId ?? id, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return '';
    else if (data?.reason) return data.reason;
    else return translate('buttons.notAccessTitle', "You don't have permission to access");
  };

  const showUrl =
    resource && (recordItemId || id) ? generateShowUrl(resource, recordItemId! ?? id!, meta) : '';

  const { variant, styles, ...commonProps } = rest;

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <ActionIcon
      onClick={(e) => {
        console.log(resource, resourceNameOrRouteName);
      }}
      {...(variant
        ? {
            variant: mapButtonVariantToActionIconVariant(variant),
          }
        : { variant: 'default' })}
      disabled={data?.can === false}
      title={disabledTitle()}
      data-testid={RefineButtonTestIds.ShowButton}
      className={RefineButtonClassNames.ShowButton}
      {...commonProps}
    >
      <IconRefresh size={18} {...svgIconProps} />
    </ActionIcon>
  );
};
