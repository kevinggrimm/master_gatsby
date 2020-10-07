import styled from 'styled-components';

// this is going to be a styled.form, because the outer element is a form
// ==> This is important for the Hook functionality to work (e.g., onSubmit)
// Made two columns + making every fieldset span both of them so that they go 100% wide
// (Above done via grid-template-columns 1fr 1fr // grid-column: span 2;)
// max height allows for scrolling when there are more pizzas than we want to display

// Want menu + order to be displayed side-by-side
// give them each a classname of menu/order respectively
// Overwrite the grid-column: span 2 to span 1 for those classes
// ==> This keeps "Your Info" above the menu and order

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  /* @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`;

export default OrderStyles;
