import { Box, Button, Group, Text } from '@mantine/core';
import { WalktourLogic } from 'walktour';

export const JoyrideTooltip = ({
  stepContent,
  next,
  prev,
  close,
  stepIndex,
  allSteps,
  disableTour,
  closeTour,
}: WalktourLogic & { disableTour: () => void; closeTour: () => {} }) => {
  return (
    <Box p="xl" bg="white" color="black" sx={{ borderRadius: '7px', zIndex: 1000 }}>
      <Text color="#333" dangerouslySetInnerHTML={{ __html: stepContent.description }} />
      <Group mt="sm">
        {stepIndex > 0 && (
          <Button onClick={() => prev()} aria-label="Назад">
            <Text id="back">Назад</Text>
          </Button>
        )}
        {allSteps.length - stepIndex !== 1 && (
          <Button onClick={() => next()}>
            <Text id="next" aria-label="Вперёд">
              Вперёд
            </Text>
          </Button>
        )}
        {allSteps.length - stepIndex === 1 && (
          <Button onClick={() => closeTour()}>
            <Text id="close">Закрыть</Text>
          </Button>
        )}
      </Group>
      {allSteps.length - stepIndex === 1 && (
        <Button mt="xs" onClick={disableTour}>
          Больше не показывать
        </Button>
        // <Checkbox
        //   sx={{ cursor: 'pointer' }}
        //   onClick={() => {}}
        //   label={<Text color="#333">Не Показывать снова</Text>}
        //   mt="sm"
        // />
      )}
    </Box>
  );
};
