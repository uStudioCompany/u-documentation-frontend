import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Text from 'ustudio-ui/components/Text';
import Dropdown from 'ustudio-ui/components/Dropdown';

import Styled from './aside.styles';
import { getMarkdownListConfig } from '../../request.config';

export const Aside = () => {
  const [navigationTree, setNavigationTree] = useState([] as { name: string; type: string }[]);
  const [isLoading, setIsLoading] = useState(true);

  const requestFolder = async (path: string) => {
    try {
      const { data }: AxiosResponse<{ name: string; type: string }[]> = await axios(
        getMarkdownListConfig('annisokay97', 'markdownRepo', path)
      );

      setNavigationTree(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getFolder = () => {
    requestFolder('docs');
  };

  useEffect(() => {
    getFolder();
  }, []);

  return (
    <Styled.Aside direction="column">
      <Text variant="h5">Documents</Text>
      {!isLoading && navigationTree.length && <NavList tree={navigationTree} prevPath="docs" />}
    </Styled.Aside>
  );
};

interface NavListProps {
  tree: {
    name: string;
    type: string;
  }[];
  prevPath: string;
}
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

interface NavItemProps {
  node: {
    name: string;
    type: string;
  };
  prevPath: string;
}
const NavItem = (props: NavItemProps) => {
  const { node, prevPath } = props;
  const [navigationTree, setNavigationTree] = useState([] as { name: string; type: string }[]);

  const requestFolder = async () => {
    if (!navigationTree.length) {
      try {
        const { data }: AxiosResponse<{ name: string; type: string }[]> = await axios(
          getMarkdownListConfig('annisokay97', 'markdownRepo', `${prevPath}/${node.name}`)
        );

        setNavigationTree(data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  };

  return (
    <Dropdown title={node.name} onChange={() => requestFolder()}>
      {navigationTree.length && <NavList tree={navigationTree} prevPath={`${prevPath}/${node.name}`} />}
    </Dropdown>
  );
};
