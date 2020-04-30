import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';

import { Node } from '../../types';

import { NavItem } from '../nav-item';

import { parseDocName } from './nav-list.module';

export const NavList = ({ tree, prevPath, isLoading }: { tree: Node[]; prevPath: string; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Flex alignment={{ horizontal: 'center' }}>
        <Spinner delay={500} appearance={{ size: 32 }} />
      </Flex>
    );
  }

  return (
    <>
      {tree?.map((node) => {
        const parsedDocName = useMemo(() => parseDocName(node.name), [node]);

        return node.type === 'tree' ? (
          <NavItem key={node.name} node={node} prevPath={prevPath} />
        ) : (
          <Link to={`/${prevPath}/${parsedDocName}`} key={node.name}>
            {parsedDocName}
          </Link>
        );
      })}
    </>
  );
};
