import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { Markdown } from '../../components/markdown';
import { getMarkdownFile } from './docs.module';

export const DocsPage: React.FC = () => {
  const { docName } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [source, setSource] = useState('');

  const getSource = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const markdownFile = await getMarkdownFile(docName);

      setSource(markdownFile);
    } catch ({ message: errorMessagee }) {
      setError(errorMessagee);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getSourceDataOnMount() {
    getSource();
  }, []);

  if (isLoading) {
    return (
      <Flex alignment={{ horizontal: 'center' }}>
        <Spinner delay={500} appearance={{ size: 32 }} />
      </Flex>
    );
  }

  if (error) {
    return (
      <Text color="var(--c-negative)" align="center">
        {`${error} ☹️`}
      </Text>
    );
  }

  return <Markdown source={source} />;
};