import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';

// Two args
// Inputs are used for sending emails
export default function usePizza({ pizzas, values }) {
  // 1. Create state to hold our order. Default to empty array; import useState
  // We got rid of this line because we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  // Add new items to state; add to the hook
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  //
  // this is the function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    // Need to set initial error, message to be null. Later on we handle the showing/hiding of both on `order.js` above the button
    setError(null);
    // NOTE -- If this is passed, it will simply display 'Go eat!' on the order.js page
    // We dont want that for handling errors, loads, and success - set to null
    // setMessage('Go eat!');

    // gather all the data
    // All of this gets sent to the backend
    // We need to make another function to modify the order (id / size is returned)
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      pestoSauce: values.pestoSauce,
    };
    console.log(body);

    // 4. Send data to a serverless function at checkout
    // Shouldn't be hardcoding this into the URL - shouldnt be written for a deployment target
    // Going to store the path in an environment variable
    // body cant be sent as an object - can be sent as a string - Use JSON.strinfigy
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    // fetch requests are in 2 stages: (1) get response - headers only (2) wait for body to come back (get response)
    // this is coming from the server (as a string) so we need to parse it
    const text = JSON.parse(await res.text());

    // check if everything worked
    // 400-599 status codes are error-related
    // if something ever went wrong with the order, you would set it within `setError()`
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  }

  // return all of the functionality that the hook needs to surface
  // can use all of this on the order.js page
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
