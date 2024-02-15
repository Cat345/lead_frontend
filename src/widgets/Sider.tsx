import { Divider, Flex } from '@mantine/core';

import { Logo } from '../shared/ui/Logo';
import { SiderWrapper } from '../shared/ui/SiderWrapper';

export const Sider: React.FC = () => {
  return (
    <SiderWrapper
      Title={({ collapsed }) => <Logo minified={collapsed} />}
      render={({ items, logout }) => {
        return (
          <Flex direction="column" justify="space-between" sx={{ height: 'calc(100vh - 70px)' }}>
            <div>{items}</div>
            <div>
              <Divider />
              {logout}
            </div>
          </Flex>
        );
      }}
    />
  );
};
