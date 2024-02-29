// import { Center, Flex, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
// import { openConfirmModal } from '@mantine/modals';
// import { useGetIdentity, useList } from '@refinedev/core';

// import { Tariff } from '../../models/Tariff';
// import { User } from '../../models/User';
// import { Loading } from '../../shared/ui/Loading';
// import { CommonPricingCard } from './PricingCard/CommonPricingCard';
// import { PrimaryPricingCard } from './PricingCard/PrimaryPricingCard';
// import { Box } from '@mantine/core';

// export const PricingPage = () => {
//   const { data: user } = useGetIdentity<User>();
//   const currentTariffId = user?.tariff.id;
//   const theme = useMantineTheme();
//   const { data: tariffs, isLoading } = useList<Tariff>({
//     resource: 'tariffs',
//   });
//   const currentTariff =
//     currentTariffId === 4 && tariffs?.data.find((tariff) => tariff.id === currentTariffId)!;
//   const otherTariffs =
//     currentTariffId === 3
//       ? tariffs?.data?.filter((tariff) => tariff.id === 3)
//       : tariffs?.data?.filter((tariff) => tariff.id !== 4);

//   const openModal = (description: string) =>
//     openConfirmModal({
//       title: 'Продолжить покупку',
//       children: <Text size="sm">{description}</Text>,
//       labels: { confirm: 'Подтвердить', cancel: 'Отменить' },
//       onCancel: () =>
//       onConfirm: () =>
//     });

//   if (isLoading) {
//     return <Loading />;
//   }
//   return (
//     <Center>
//       <Group sx={{ zIndex: 10 }}>
//         <Stack spacing={30} sx={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
//           <Center>
//             <Title order={2}>Подписка</Title>
//           </Center>
//           <Group>
//             <Flex
//               align={'center'}
//               direction={{ base: 'column', sm: 'row' }}
//               gap={{ base: '1.5rem', sm: 0 }}
//             >
//               {otherTariffs?.map((tariff, index) =>
//                 index === 1 ? (
//                   <PrimaryPricingCard
//                     isActive={currentTariffId === tariff.id}
//                     tariff={tariff}
//                     theme={theme}
//                     key={tariff.id}
//                     handleOpenModal={openModal}
//                   />
//                 ) : (
//                   <CommonPricingCard
//                     isActive={currentTariffId === tariff.id}
//                     tariff={tariff}
//                     theme={theme}
//                     handleOpenModal={openModal}
//                     key={tariff.id}
//                   />
//                 )
//               )}
//             </Flex>
//           </Group>
//         </Stack>

//         {currentTariff && (
//           <Center w={'100%'}>
//             <Box>
//               <Title order={2} align="center">
//                 Текущая подписка
//               </Title>
//               <PrimaryPricingCard
//                 isActive={true}
//                 tariff={currentTariff}
//                 theme={theme}
//                 handleOpenModal={openModal}
//               />
//             </Box>
//           </Center>
//         )}
//       </Group>
//     </Center>
//   );
// };
