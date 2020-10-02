import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

// Gatsby will recognize that you exported a GraphQL component...
// ... run it behind the scenes.... and stick it inside props.data
// TIP: Prefer to destructure one level deep

// In Gatsby, you just go ahead and use the data
// There is never a loading state because the page is already built
// This is the beauty of server-side rendering -- it is already loaded into the page. In build time, it builds it and then ships off to the server

// TIP: Keep pages as thin as possible
// The pizzas are passed down into the list as a prop
// THEN, you go into the pizza list and destructure the prop to access pizzas
export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// Doesnt matter what the var is
// Just matters that graphql query will be turned into data
// You can name queries (but you dont have to)

// GraphQL fragments
// When you query the same thing, it is easier to stick it inside of a "fragment"
// A fragment is a collection of fields that you want
// The fragment comes with the sanity plugin we used
// GatsbySanityImageFluid

// RENAMING QUERIES
// You can rename a query using <NEW_NAME>: <old_name> [ex: allSanityPizza]

// Once this is exported, you can view the PizzasPage() React component in your browser
// Under props, there is now a property `data` that contains the results from the Graph QL query
// REGEX TIP: If you are trying to regex it: you cant interpolate values into a regex
// If you wanted to pass in a regex, you would need to create the regex IN javascript in gatsby-node.js
// The variable $topping would instead be $toppingRegex (re)
// filter: { toppings: { elemMatch: { name: { regex: }}}}
//

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
