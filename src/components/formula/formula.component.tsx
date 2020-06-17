import React from 'react';

import MathJax from 'react-mathjax2';

const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))';
const content = `This can be dynamic text (e.g. user-entered) text with ascii math embedded in  symbols like $$${ascii}$$`;

export const Formula = () => {
  return (
    <MathJax.Context
      input="ascii"
      onLoad={() => console.log('Loaded MathJax script!')}
      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
      options={{
        asciimath2jax: {
          useMathMLspacing: true,
          delimiters: [['$$', '$$']],
          preview: 'none',
        },
      }}
    >
      <MathJax.Text text={content} />
    </MathJax.Context>
  );
};
