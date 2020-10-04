import React, { useState } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';

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
export default function OrderPage() {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  return (
    <>
      <SEO title="Order a Pizza!" />
      <form>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  );
}
// dont have to worry about fetching TOO much data - just happens at build time (not at the user's page load -- so it isnt as expensive)
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
