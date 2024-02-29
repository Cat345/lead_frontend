import { Flex } from '@mantine/core';
import React from 'react';

import FullLogoSvg from '../assets/logo-full.svg';
import MiniLogoSvg from '../assets/logo-mini.svg';

type LogoProps = {
  minified?: boolean;
};
export const Logo: React.FC<LogoProps> = ({ minified }) => {
  return (
    <Flex p="xl" align="center" justify="center">
      {minified ? <MiniLogoSvg /> : <FullLogoSvg />}
    </Flex>
  );
};
