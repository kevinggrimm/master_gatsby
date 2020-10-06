import React, { useState } from 'react';

// Create a order context
const OrderContext = React.createContext();

// Provider == component that will live at a higher level; inject at root

// DEBUGGING - Initially set the state via UseState and did nothing with it, which led to `undefined` being passed into the console on order.js
// Need to explicitly go to your provider and set it as a value prop
// To surface at a higher level, pass the value prop to your provider
export function OrderProvider({ children }) {
  // we need to stick state in here. Have been sticking state in lower-level hook
  // Going to stick state into the Provider and access the state from our hook
  // Simply moving the state into the Order Context
  const [order, setOrder] = useState([]);

  // Returns a set of tags
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
