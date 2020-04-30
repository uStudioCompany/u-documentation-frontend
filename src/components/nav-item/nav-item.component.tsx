import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Dropdown from 'ustudio-ui/components/Dropdown';

import { Node } from './../../types';

import { NavList } from '../nav-list';

import Styled from './nav-item.styles';
import { getMarkdownList } from './nav-item.module';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const [navigationTree, setNavigationTree] = useState([] as Node[]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = async () => {
    if (!navigationTree.length) {
      setLoading(true);
      try {
        const fileTree = await getMarkdownList(path);

        setNavigationTree(fileTree);
      } catch ({ message: errorMessage }) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isRoot) {
      getFolder();
    }
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
        <NavList tree={navigationTree} prevPath={path} isLoading={isLoading} />
      ) : (
        <Dropdown
          title={node.name}
          onChange={() => getFolder()}
          styled={{
            DropdownContainer: css`
              border: none;
              box-shadow: none;
              &:hover {
                box-shadow: none;
              }
            `,
            Title: css`
              padding: 0;
            `,
            Content: css`
              padding: var(--i-medium) 0 var(--i-medium) var(--i-medium);
            `,
            Dropdown: css`
              overflow: visible;
            `,
          }}
        >
          <NavList tree={navigationTree} prevPath={path} isLoading={isLoading} />
        </Dropdown>
      )}
    </Styled.NavItem>
  );
};
