import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Dropdown from 'ustudio-ui/components/Dropdown';

import Styled from './aside.styles';
import { getMarkdownListConfig } from '../../lib';

interface Node {
  name: string;
  type: string;
}

interface NavListProps {
  tree: Node[];
  prevPath: string;
}

interface NavItemProps {
  node: Node;
  prevPath?: string;
  isRoot?: true;
}

export const Aside = () => {
  return (
    <Styled.Aside direction="column">
      <NavItem node={{ name: 'docs', type: 'tree' }} isRoot />
    </Styled.Aside>
  );
};

const NavList = (props: NavListProps) => {
  const { tree, prevPath } = props;

  return (
    <>
      {tree.map((node) =>
        node.type === 'tree' ? (
          <NavItem key={node.name} node={node} prevPath={prevPath} />
        ) : (
          <a key={node.name}>{node.name}</a>
        )
      )}
    </>
  );
};

const NavItem = (props: NavItemProps) => {
  const { node, prevPath, isRoot } = props;
  const [navigationTree, setNavigationTree] = useState([] as Node[]);
  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = async () => {
    if (!navigationTree.length) {
      try {
        console.log(path);
        const { data }: AxiosResponse<Node[]> = await axios(getMarkdownListConfig('annisokay97', 'markdownRepo', path));

        setNavigationTree(data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  };

  useEffect(() => {
    if (isRoot) {
      getFolder();
    }
  }, []);

  return (
    <Styled.NavItem>
      {isRoot ? (
        navigationTree.length && <NavList tree={navigationTree} prevPath={path} />
      ) : (
        <Dropdown
          title={node.name}
          onChange={() => getFolder()}
          styled={{
            DropdownContainer: css`
              border: none;
              box-shadow: none;
            `,
            Title: css`
              padding: 0;
            `,
            Content: css`
              padding: var(--i-medium);
            `,
          }}
        >
          {navigationTree.length && <NavList tree={navigationTree} prevPath={path} />}
        </Dropdown>
      )}
    </Styled.NavItem>
  );
};
