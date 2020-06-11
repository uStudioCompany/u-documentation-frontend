import React, { useCallback, useEffect, useState } from 'react';

import { JsonSchemaParser } from 'u-json-docs';
import { JSONSchema7 } from 'json-schema';

import Flex from 'ustudio-ui/components/Flex';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';

import { getDocPropsFromHref } from '../../utils';
import { FadeIn } from '../fade-in';

import { getJsonSchemaDocument } from './json-schema.module';
import type { SchemaProps } from './json-schema.types';

export const JsonSchema: React.FC<SchemaProps> = ({ href, title }) => {
  const [isLoading, setLoading] = useState(false);
  const [source, setSource] = useState<JSONSchema7>({});
  const [error, setError] = useState<null | string>(null);

  const getJsonSchemaSource = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const jsonScheme = await getJsonSchemaDocument(href);

      setSource(jsonScheme);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getCsvDocumentOnMount() {
    getJsonSchemaSource();
  }, []);

  if (isLoading) {
    return <Spinner delay={1000} appearance={{ size: 16 }} />;
  }

  if (error) {
    return (
      <FadeIn>
        <Text color="var(--c-negative)">
          This schema was unable to load{' '}
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
        <JsonSchemaParser schema={source} title={getDocPropsFromHref(href, 'schema.json').docName} />
      </Flex>
    </FadeIn>
  );
};
