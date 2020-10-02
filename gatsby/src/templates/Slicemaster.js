import React from 'react';
import { graphql } from 'gatsby';

export default function Slicemaster() {
  return <p>SLICEMASTER!!!</p>;
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
