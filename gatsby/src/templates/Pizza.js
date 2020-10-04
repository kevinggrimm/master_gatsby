import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO.js';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

// TIP -- When adding images, it is likely that at some point you will delete the image. That will cause the entire page to break because it is looking for an image that does not exist
// SOLUTION -- Add `?` after each. It will make sure that pizza.image. exists before going deeper into the branch. This is called "nested chaining"
// Previously you had to check if all of these things existed. Gatsby is set up under the hood to convert these into a long drawn-out if statement
export default function SinglePizzaPage({ data: { pizza } }) {
  console.log(pizza);
  return (
    <>
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} />
        <div>
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via
// context in node.js
// Set up query to expect to take an argument
// $slug: String! --> slug w/ type of String --> Required
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
