import React from 'react';
import ReactMarkdown from 'react-markdown';

import { MarkdownProps } from './markdown.types';

export const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  return <ReactMarkdown source={source} escapeHtml={false} />;
};
