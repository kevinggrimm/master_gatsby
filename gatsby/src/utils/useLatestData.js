import { useState, useEffect } from 'react';

const gql = String.raw;
const zas = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;
// when this hook runs:
// 1. create two pieces of state
// 2. run fetch
// 3. when done, set the data to JSON
// Good use case for not using async await
// React doesnt allow the function within useEffect to be async
export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // use a side effect to fetch the data from a graphql endpoint
  // useEffect is a React hook that, when the component mounts, it will
  // run the code inside of there (mounting). will also rerun if any of the data changes
  // If we wanted to rerun whenever something changed (e.g., store name), you can pass
  // variables into the second argument. We are just going to pass an empty array bc
  // we arent changing any vars
  useEffect(function () {
    // when the component loads, fetch the data
    // Storing the GraphQL endpoint as an environment variable
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // object has the query inside of it. We cant just pass it as "query {...}"
      // the data has to be a string, so we stringify it
      // not using Gatsby-image (outside of gatsby image)
      // you can probably query the parts you need from Gatsby image, but sometimes there is a use case
      // where you want to grab the parts yourself and use a regular image tag
      // ==> Going to be using a property called "lqip" ==> low quality imageg placeholder
      // NOTE --> It is _id instead of id because we are querying Sanity directly

      // TIP ==> Pass identical graphQL components into a template string and iterpolate them

      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${zas}
              }
              hotSlices {
                ${zas}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: Check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      // catch the error
      .catch((err) => {
        console.log('WHOOPS');
        console.log(err);
      });
  }, []);
  // return the two pieces of state
  return {
    hotSlices,
    slicemasters,
  };
}
