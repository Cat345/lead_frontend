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
import { CreateButtonProps, mapButtonVariantToActionIconVariant } from '@refinedev/mantine';
import { RefineButtonClassNames, RefineButtonTestIds } from '@refinedev/ui-types';
import { IconSquarePlus } from '@tabler/icons';
import React, { useContext } from 'react';

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  resourceNameOrRouteName,
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
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const { createUrl: generateCreateUrl } = useNavigation();

  const { resource } = useResource(resourceNameFromProps ?? resourceNameOrRouteName);

  const { data } = useCan({
    resource: resource?.name,
    action: 'create',
    queryOptions: {
      enabled: accessControlEnabled,
      cacheTime: 0,
    },
    params: {
      resource,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return '';
    else if (data?.reason) return data.reason;
    else return translate('buttons.notAccessTitle', "You don't have permission to access");
  };

  const createUrl = resource ? generateCreateUrl(resource, meta) : '';

  const { variant, ...commonProps } = rest;

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Anchor
      id="create-button"
      component={ActiveLink as any}
      to={createUrl}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (data?.can === false) {
          e.preventDefault();
          return;
        }
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {hideText ? (
        //@ts-ignore
        <ActionIcon
          title={disabledTitle()}
          disabled={data?.can === false}
          color="primary"
          {...(variant
            ? {
                variant: mapButtonVariantToActionIconVariant(variant),
              }
            : { variant: 'filled' })}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          {...commonProps}
        >
          <IconSquarePlus size={18} {...svgIconProps} />
        </ActionIcon>
      ) : (
        <Button
          disabled={data?.can === false}
          leftIcon={<IconSquarePlus size={18} {...svgIconProps} />}
          title={disabledTitle()}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          color="primary"
          variant="filled"
          {...rest}
        >
          {children ?? translate('buttons.create', 'Create')}
        </Button>
      )}
    </Anchor>
  );
};
