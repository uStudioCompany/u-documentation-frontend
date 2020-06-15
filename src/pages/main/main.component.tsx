import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRequest } from 'honks';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Spinner from 'ustudio-ui/components/Spinner';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';

import { name } from '../../../config.json';

import { getMarkdownDocument, Wrapper } from './main.module';

export const Main = () => {
  const getMainContent = async (): Promise<string> => {
    return getMarkdownDocument();
  };

  const { sendRequest, onSuccess, onFail, onPending } = useRequest(getMainContent);

  useEffect(function getSourceDataOnMount() {
    sendRequest();
  }, []);

  return (
    <>
      <Helmet>
        <title>{name} documentation</title>
      </Helmet>

      <Wrapper>
        {onPending(() => {
          return (
            <FadeIn>
              <CenteredContainer>
                <Flex alignment={{ horizontal: 'center' }}>
                  <Spinner appearance={{ size: 48 }} />
                </Flex>
              </CenteredContainer>
            </FadeIn>
          );
        })}

        {onSuccess((data) => {
          return (
            <FadeIn>
              <Markdown source={data} />
            </FadeIn>
          );
        })}

        {onFail((error) => {
          return (
            <FadeIn>
              <CenteredContainer>
                <Text variant="h5" color="var(--c-negative)" align="center">
                  {`${error} ☹️`}
                </Text>
              </CenteredContainer>
            </FadeIn>
          );
        })}
      </Wrapper>
    </>
  );
};
