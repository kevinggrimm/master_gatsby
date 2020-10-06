import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

// Wrapping the root elelemtn with the OrderProvider tag
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
