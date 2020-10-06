import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

// props: order (to display); pizzas (to look up image, price, name, etc); removeFromOrder function (if we want to remove it)

// dont want to return a div - just the raw order items
// We need to look up the pizza image in the pizzas array
export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);

        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} />
            <h2>{pizza.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
