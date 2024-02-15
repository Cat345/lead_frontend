import { Box, Button, Card, Center, Flex, Stack, Text, Title } from '@mantine/core';
import { useGetIdentity } from '@refinedev/core';

export const ProfilePage = () => {
  const { data: identity } = useGetIdentity();
  return (
    <Center h="70dvh">
      <Card shadow="xl" miw="30%" p="sm">
        <Text component="p">
          <Text c="dimmed" component="span">
            Email:{' '}
          </Text>
          {identity?.email}
        </Text>
        <Button variant="light" color="red" fullWidth mt="md" radius="md">
          Оформить подписку
        </Button>
      </Card>
    </Center>
  );
};
