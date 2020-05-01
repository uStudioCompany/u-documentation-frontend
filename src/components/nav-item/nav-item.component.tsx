import React, { useCallback, useEffect, useState } from 'react';
import { Flex } from 'ustudio-ui';

import Text from 'ustudio-ui/components/Text';

import type { Node } from '../../types';

import { NavList } from '../nav-list';

import { getEntries } from './nav-item.module';
import Styled from './nav-item.styles';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const [folder, serFolder] = useState([] as Node[]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = useCallback(async (): Promise<void> => {
    if (!folder.length) {
      setLoading(true);

      try {
        const entries = await getEntries(path);

        serFolder(entries);
      } catch ({ message: errorMessage }) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  useEffect(function getFolderOnMount() {
    getFolder();
  }, []);

  if (error) {
    return (
      <Text color="var(--c-negative)" align="center">
        {`${error} ☹️`}
      </Text>
    );
  }

  return (
    <Styled.NavItem>
      {isRoot ? (
        <NavList tree={folder} prevPath={path} isLoading={isLoading} />
      ) : (
        <Flex direction="column" margin={{ left: 'regular' }}>
          <NavList tree={folder} prevPath={path} isLoading={isLoading} />
        </Flex>
      )}
    </Styled.NavItem>
  );
};
