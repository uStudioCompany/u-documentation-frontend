import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useRequest } from 'honks';
import MathJax from 'react-mathjax2';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { encodePath } from '../../utils';

import { Markdown } from '../../components/markdown';
import { CenteredContainer } from '../../components/centered-container';
import { FadeIn } from '../../components/fade-in';
import { Formula } from '../../components/formula';

import { getMarkdownDocument } from './docs.module';

export const DocsPage: React.FC = () => {
  const { path, docName } = useParams();

  const getSource = (): Promise<string> => {
    return getMarkdownDocument({
      path: encodePath(path),
      docName,
    });
  };

  const { sendRequest, onSuccess, onFail, onPending } = useRequest(getSource);

  useEffect(
    function getSourceDataOnMount() {
      sendRequest();
    },
    [path, docName]
  );

  const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))';
  const content = `This can be dynamic text (e.g. user-entered) text with ascii math embedded in  symbols like $$${ascii}$$`;

  return (
    <>
      <Helmet>
        <title>{docName}</title>
      </Helmet>
      <FadeIn>
        {onPending(() => {
          return (
            <CenteredContainer>
              <Flex alignment={{ horizontal: 'center' }}>
                <Spinner delay={500} appearance={{ size: 48 }} />
              </Flex>
            </CenteredContainer>
          );
        })}

        {onSuccess((data) => {
          return (
            <MathJax.Context
              input="ascii"
              script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
              options={{
                asciimath2jax: {
                  useMathMLspacing: true,
                  delimiters: [['$$', '$$']],
                  preview: 'none',
                },
              }}
            >
              <div>
                <MathJax.Text text={<Markdown source={content} />} />
              </div>
            </MathJax.Context>
          );
        })}

        {onFail((error) => {
          return (
            <CenteredContainer>
              <Text color="var(--c-negative)" align="center">
                {`${error.message} ☹️`}
              </Text>
            </CenteredContainer>
          );
        })}
      </FadeIn>
    </>
  );
};
