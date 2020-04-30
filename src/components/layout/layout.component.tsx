import React, { FC, useState } from 'react';

import useMediaQuery from 'ustudio-ui/hooks/use-media-query';
import Flex from 'ustudio-ui/components/Flex';

import logo from '../../assets/images/logo.svg';

import { Aside } from './../aside';
import Styled from './layout.styles';

export const Layout: FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const isMd = useMediaQuery('screen and (min-width: 768px)');

  return (
    <Styled.Layout>
      <Styled.Header>
        <Styled.LogoLink to="/">
          <Styled.LogoImage src={logo} alt="uDocumentation Logo" />
          <Styled.LogoText>uDocumentation</Styled.LogoText>
        </Styled.LogoLink>

        {!isMd && <Styled.DrawerButton drawerIsOpen={isDrawerOpen} onClick={() => setDrawerOpen(!isDrawerOpen)} />}
      </Styled.Header>

      <Styled.Main>
        <Aside isMd={isMd} setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen} />

        <Flex padding={{ left: 'large', right: 'large' }}>{children}</Flex>
      </Styled.Main>

      <Styled.Footer>
        © 2020{' '}
        <a href="https://ustudio.company" target="_blank" rel="noreferrer noopener">
          uStudio LLC
        </a>{' '}
        ❤️
      </Styled.Footer>
    </Styled.Layout>
  );
};
