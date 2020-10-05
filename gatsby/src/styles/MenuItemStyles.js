import styled from 'styled-components';

// Want a 100px image and everything else to go to the right of it, regardless of the space
// grid-template-rows; 1fr 1fr ==> creates two rows

// We want the image to cover two full rows and have the pizza name + size/prices to the right of it
// To do this, we need to select the gatsby image wrapper
// height: 100%; ==> the image will stretch itselff gatsby uses object-fit cover, so the image will not get distorted - just cropped

// We want space to the right of each button WHEN there is another button following
// To do this in CSS, you can enter `button + button { margin-left: 1rem; }`
// Alternatively can put them into a div and put grid-gap onto the element

// The .remove class is for when we want to remove items from the cart

// NOTE: When the `remove` button was added to the PizzaOrder.js component, it was not showing up. This is because there wasn't a "position: relative" CSS attribute.

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  position: relative;
  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }
  p {
    margin: 0;
  }
  button {
    font-size: 1.5rem;
  }
  button + button {
    margin-left: 1rem;
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
`;

export default MenuItemStyles;
