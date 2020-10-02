import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

// NOTE ON APPROACH
// Wes starts out with a BASIC scafffold of the new component
// Then layers it onto the component he wants it to be part of (import into pizzas.js)
// Continues iterating from there

// Adding more styling for the toppings
// Wrap the elements so they stay within the box
// Add a gap between the elements with `gap`
// margin-bottom adds space between the toppings and pizza names
// display grid on anchor links to put them side by side
// grid-template-columns -->
// grid-gap: 0 1rem --> only want spacing L-R, not T-B
// align-items: center --> helpful when the font size of the count is smaller than the link text
// MEANING --> It will center the topping name + count within their container

// NEXT VIDEO -- Dynamically create pages for both the pizzas and toppings

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  // Make a big array of every property using .flat()
  // Takes an array of arrays and turns it into a single array
  // Then use reduce to tabulate the num times the topping is fofund
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // DEBUGGING SECTION: Originally returned a list of 34 toppings all w/ counts of 1
        // Starting here and console.log()'ing the existingTopping var
        console.log('Existing Topping', existingTopping.name);
        // if it is, increment by one with object count() property
        existingTopping.count += 1;
      } else {
        console.log('New Topping', topping.name);
        // otherwise, create a new entry in our accumulate and set to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  // sort them based on their count
  // TIP: Cannot call sort directly on an object
  // Must call Object.values(counts)
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

// NEXT -- STATIC QUERIES
// In pizzas.js, we exported a graphql query from the page
// For GraphQL, you can filter queries to, for ex, specific toppings -- it is a DYNAMIC query
// If you want to query data anywhere else outside of a page (such as in a component), you have to use a STATIC query
// Static queries do not use variables --> this is a limitation of Gatsby
// SUMMARY: To be dynamic, do it at the page level + pass the data down. Static query w/ no variables --> run wherever with a React Hook
// The hook we are going to use is called `useStatQuery()`
export default function ToppingsFilter({ activeTopping }) {
  // PART I. Get a list of all the toppings
  // Some graphql packages will automatically pluralize your data types
  // NOTE: This returns "data", which has toppings inside of it
  // We want toppings, so we can destructure it to just return that inner object
  // PART II. Get a list of all the Pizzas with their toppings
  // TIP: Wrap console.log({ toppings, pizzas }) to know what your vars are called when you log them
  // NOTE -- not using toppings as part of the query. Actual loop comes from the aggreggation with map
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // console.clear(); // TIP -- Clear the console every time you make a change
  // console.log({ toppings, pizzas });
  // PART III. Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // console.log(toppingsWithCounts);

  // Link it up...
  // PART IV. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // Need to link this to pages
  // You can use the topping page in the URL
  // Alternatively, you can use the slug
  // DOWNSIDE: If the topping has a character (such as a space) it will get encoded in the URL (slug is better looking)
  // Also need a class on the Link that shows if we are on the toppings page (will do in future video)
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
