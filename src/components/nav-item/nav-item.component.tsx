import React, { useEffect, useState } from 'react';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { useRequest } from 'honks';

import { FadeIn } from '../fade-in';
import { NavList } from '../nav-list';

import { getEntries } from './nav-item.module';
import Styled from './nav-item.styles';

import type { Node } from '../../types';

export const NavItem = ({ node, prevPath, isRoot }: { node: Node; prevPath?: string; isRoot?: true }) => {
  const [folder] = useState([] as Node[]);

  const path = `${prevPath ? `${prevPath}/` : ''}${node.name}`;

  const getFolder = async (): Promise<Node[]> => {
    if (!folder.length) {
      return getEntries(path);
    }
    return [];
  };

  const { sendRequest, onSuccess, onFail, isPending } = useRequest(getFolder);

  useEffect(function getFolderOnMount() {
    sendRequest();
  }, []);

  return (
    <>
      {onFail((error) => {
        return (
          <FadeIn>
            <Text color="var(--c-negative)" align="center">
              {`${error} ☹️`}
            </Text>
          </FadeIn>
        );
      })}

      {onSuccess((data) => {
        return (
          <FadeIn>
            <div>
              {isRoot ? (
                <NavList tree={data} prevPath={path} isLoading={isPending()} />
              ) : (
                <Flex direction="column" margin={{ top: 'medium' }}>
                  <Flex alignment={{ vertical: 'center' }}>
                    <Styled.Folder />

                    <Text>{node.name}</Text>
                  </Flex>

                  <Styled.NavList direction="column">
                    <NavList tree={data} prevPath={path} isLoading={isPending()} />
                  </Styled.NavList>
                </Flex>
              )}
            </div>
          </FadeIn>
        );
      })}
    </>
  );
};
