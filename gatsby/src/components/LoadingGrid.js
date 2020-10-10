import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

// prop is the count of number of loader items to show
// The second argument of Array.from is a map function
// Count is ingested as a prop from index.js from each component

// GENERATING A BLANK IMAGE
// We are creating a blank image that has a ratio of 5px wide by 4px higgh
// This allows us to maintain a ratio while the image is not loaded
// You can generate one from png-pixel.com
// Can update the dimensions in CSS
export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loader-${i}`}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            className="loading"
            alt="Loading"
            width="500"
            height="400"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
