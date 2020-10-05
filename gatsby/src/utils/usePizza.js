import { useState } from 'react';

// Two args
// Inputs are used for sending emails
export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold our order. Default to empty array; import useState
  const [order, setOrder] = useState([]);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      // if you omit the second arg of slice, it goes to the end of array
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send data to a serverless function at checkout
  // TODO

  // returnn all of the functionality that the hook needs to surface
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
