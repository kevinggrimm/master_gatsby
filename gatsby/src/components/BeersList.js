import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

function SingleBeer(beer) {
  return <p>This is for {beer}</p>;
}

export default function BeerList({ beers }) {
  return (
    <div>
      {beers.map((beer) => (
        <li key={beers.id} />
      ))}
    </div>
  );
}
