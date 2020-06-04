import React, { useCallback, useEffect, useState } from 'react';

import { JSONSchema4 } from 'json-schema';
import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { FadeIn } from '../fade-in';

import { getJsonSchemeDocument } from './json-scheme.module';
import type { SchemeProps } from './json-scheme.types';
import { Wrapper } from './json-scheme-wrapper.component';


export const JsonScheme: React.FC<SchemeProps> = ({ href, title }) => {
  const [isLoading, setLoading] = useState(false);
  const [source, setSouce] = useState<JSONSchema4>({});
  const [error, setError] = useState<null | string>(null);

  const getJsonSchemeSource = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const jsonScheme = await getJsonSchemeDocument(href);

      setSouce(jsonScheme);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getCsvDocumentOnMount() {
    getJsonSchemeSource();
  }, []);

  if (isLoading) {
    return <Spinner delay={1000} appearance={{ size: 16 }}/>;
  }

  if (error) {
    return (
      <FadeIn>
        <Text color="var(--c-negative)">
          This table was unable to load{' '}
          <span role="img" aria-label=":(">
            ☹️
          </span>
        </Text>
      </FadeIn>
    );
  }


  return (
    <FadeIn>
      <Flex direction="column" margin={{ top: 'regular' }}>
        <Wrapper schema={source} title="BLA"/>
      </Flex>
    </FadeIn>
  );
};
