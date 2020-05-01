import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Placeholder from 'ustudio-ui/components/Placeholder';

import { NavItem } from '../nav-item';

import { DrawerState } from '../layout';

import type { Node } from '../../types';
import { getRandomPlaceholderWidth } from './nav-list.module';

import Styled from './nav-list.styles';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading: boolean }) => {
  const setDrawerState = useContext(DrawerState);

  if (isLoading) {
    return <Placeholder variant="text" appearance={{ width: `${getRandomPlaceholderWidth()}%`, height: 'body' }} />;
  }

  return (
    <>
      {tree?.map((node) => {
        const parsedDocName = node.name.replace('.md', '');

        return node.type === 'tree' ? (
          <NavItem key={node.name} node={node} prevPath={prevPath} />
        ) : (
          <Styled.Button type="button" onClick={setDrawerState} key={node.name}>
            <Link to={`/${prevPath}/${parsedDocName}`}>{parsedDocName}</Link>
          </Styled.Button>
        );
      })}
    </>
  );
};
