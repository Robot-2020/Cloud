import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const markdownToHtml = (markdown) => {
  return DOMPurify.sanitize(marked.parse(markdown));
};