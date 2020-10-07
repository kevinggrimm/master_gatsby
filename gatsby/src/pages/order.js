import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/Orderstyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

// We need a couple fieldsets. Name/email, menu, etc.

// If we want to save our data to state when it gets typed into an input box, we need to correspond that with state
// SOL -- Import the hook `useState`, create it
// You cannot put state in an input to React without having a function to manage that change
// PROBLEM - What happens when you have 10+ inputs
// Having to create an updateState function for each can be a lot
// SOLUTION -- Formik -- library for managing forms in React
// OTHER OPTION - Custom hook to manage forms
// Create in utils folder

// With custom hook:
// You have to explicitly set the default values of whatever inputs you have
// You can add additional ffields to the state as well and set defaults (ex, coupon)

// TIP: Image was queried at 100x100 (and used @ 50x50) so that it will look good on hi-res screens
export default function OrderPage({ data }) {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;
  // Import the custom hook we made for order-related actions
  // Should be able to inspect the orders page in Reat Components; go to `hooks` --> we will see the two hooks
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a Pizza!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              {/* Pricing logic used: Price stored is M; S/L can be calculated from M. Going to make a utility function - calculatePizzaPrice.js */}
              {/* with the onClick function, when someone clicks, it adds the id and size to the state. Dont need to pass all pizza info to state (can look it up) */}
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          {/* Why the function has to be passed in: it is bound to the list of state. If you were to use the hook again, you would create a second set of pizzas and wouldn't be able to talk to each other */}
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          {error && <p>Error: {error}</p>}
          <button type="submit" disabled={loading}>
            {/* */}
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}
// dont have to worry about fetching TOO much data - just happens at build time (not at the user's page load -- so it isnt as expensive)
// REMEMBER - queries are visible within a component props in React dev tools under `data`
export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
