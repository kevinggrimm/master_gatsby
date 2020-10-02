import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

// NOTE: The actual import is called 'gatsby-image', but it is typically imported as Img

// 1fr = 1 free space unit
// After creating the Styled Component, replace the styled elelment with the Component
// In this case, we are replacing the wrapper <div></div> tags with <PizzaGridStyles>

// FIRST PROBLEM: Images are not always lining up perfectly (not cropped the same way)
// This is common where a cliennt will upload files and they dont match up
// Also, the toppings can be on more than 1 line which messes the portion up
// SOLUTION: We specify the rows of the grid
// Row 1 --> Title
// Row 2 --> Ingredients
// Row 3 --> Photo
// We dont need to explicitly state the rows -- they are automatically generated rows in CSS Grid
// Specify the automatically generated sizes with `grid-auto-rows: auto auto 500px;
const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

// SECONND PROBLEM: That doesn't fix the problem -- we put the rows around ALL pizzas (replaced wrapper divs)
// The items that we want to alignn are not direct children of our grid... they are direct children of a SinglePizza
// We want to align the items in the pizza (h2, paragraph, image)
// SOLUTION: We need to tell the h2, p, and image to align themselves not based on the <div>, but on the parent
// This is known as SubGrid --> Children off another child will align themselves to a granparent grid
// THIRD PROBLEM: Starts to work, but the height of the pizzas are not all the same
// SOLUTION: This is where we use subgrid
// Take your row sizing not from the pizzaStyles div, but from the pizzaGridStyles grid
// Specify that each pizza should take up 3 rows w/ grid-row: span 3
// We also need to overwrite the grid-gap that we are inheriting from the PizzaGridStyles
// Removig the margin from h2 and p will bring the elements closer together
// FOURTH PROBLEM: Some Browsers (such as Chrome) do not support CSS subgrid
// SOLUTION: Add @supports not statement
// Can optionally change it to a CSS variable. var(--rows, subgrid) --> check if there, if not fall back on subgrid
const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

// From pizza.js, destructure the prop to get pizzas
// TIP: Anytime there is a grid of items + singular items, almost always make a separate component for the grid and another component for the individual items

// Not exporting beause we dont want to use it anywhere else on the website
// If we are just using it here, then just put it in the same file
// If using across the website, then put it into its own component

// If you want to generate a slug:

// We are not going to create a page for every pizza
// However, we will be DYNAMICALLY creating those pages in a future video
function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

// Any time you map over something, you must give the individual item a unique key
// That is why we queried the ID of the pizza
export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
