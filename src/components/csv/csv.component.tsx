import React, { useCallback, useEffect, useState } from 'react';
import Spinner from 'ustudio-ui/components/Spinner';
import Text from 'ustudio-ui/components/Text';
import { CsvToHtmlTable } from 'react-csv-to-table';

import { csvFilter, getCsvDocument, getQueryFromHref } from './csv.module';
import { CSVProps } from './csv.types';

export const CSV: React.FC<CSVProps> = ({ href }) => {
  const [isLoading, setLoading] = useState(false);
  const [source, setSouce] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const getCsvSource = useCallback(async () => {
    try {
      setLoading(true);

      const csvString = await getCsvDocument(href);
      const filteredCsv = csvFilter({ csvString, queryString: getQueryFromHref(href) });

      setSouce(filteredCsv);
    } catch ({ message: errorMessage }) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function getCsvDocumentOnMount() {
    getCsvSource();
  }, []);

  if (isLoading) {
    return <Spinner delay={1000} appearance={{ size: 16 }} />;
  }

  if (error) {
    return (
      <Text color="var(--c-negative)">
        This table was unable to load{' '}
        <span role="img" aria-label=":(">
          ☹️
        </span>
      </Text>
    );
  }

  return <CsvToHtmlTable data={source} csvDelimiter=";" />;
};
