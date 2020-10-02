// Layout is the upper-most component in our React Stack
// This needs to be exported to render all components on our page

import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
