import React, { useEffect, useState } from 'react';
import Placeholder from 'ustudio-ui/components/Placeholder';

import { CSVProps } from './csv.types';

export const CSV: React.FC<CSVProps> = ({ query }) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!isMounted) {
    return <Placeholder appearance={{ width: '100%' }} />;
  }

  return <p>csv!</p>;
};
