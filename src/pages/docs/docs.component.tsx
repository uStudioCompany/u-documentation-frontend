import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { Markdown } from '../../components/markdown';
import { getMarkdownFile, kebabToHumanCase } from './docs.module';

export const DocsPage: React.FC = () => {
  const { docName } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [source, setSource] = useState('');

  useEffect(() => {
    setLoading(true);

    if (isLoading) {
      try {
        const markdownFile = getMarkdownFile(kebabToHumanCase(docName));

        setSource(markdownFile);
      } catch ({ message: errorMessagee }) {
        setError(errorMessagee);
      } finally {
        setLoading(false);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <Spinner delay={500} appearance={{ size: 32 }} />;
  }

  if (error) {
    return <Text color="var(--c-negative)">{error}</Text>;
  }

  return <Markdown source={source} />;
};
