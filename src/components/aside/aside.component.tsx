import React from 'react';

import { repo } from '../../../config.json';

import Styled from './aside.styles';
import { NavItem } from './../nav-item';

export const Aside = ({
  setDrawerOpen,
  isDrawerOpen,
  isMd,
}: {
  setDrawerOpen: (isOpen: boolean) => void;
  isDrawerOpen?: boolean;
  isMd?: boolean;
}) => {
  if (!isMd) {
    return (
      <Styled.Drawer isOpen={!!isDrawerOpen} onChange={() => setDrawerOpen(false)}>
        <NavItem node={{ name: repo.docsFolder, type: 'tree' }} isRoot />
      </Styled.Drawer>
    );
  }

  return (
    <Styled.Aside direction="column">
      <NavItem node={{ name: repo.docsFolder, type: 'tree' }} isRoot />
    </Styled.Aside>
  );
};
