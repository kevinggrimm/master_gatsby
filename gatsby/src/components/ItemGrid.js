import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

// Downside to not using Gatsby image -- you get the raw image. cant be loading the raw image
// SOLUTION --> Sanity has image resizing via the URL
// Add a query string and specify the desired w, h, crop

// -- Showing the lqip -- low quality image placeholder
// Add a style to the image
export default function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item) => (
        <ItemStyles key={item._id}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            width="500"
            height="400"
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name}
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
