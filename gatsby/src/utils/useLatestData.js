import { useState, useEffect } from 'react';

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
      body: JSON.stringify({
        query: `
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
              }
              hotSlices {
                name
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
        console.log(res.data);
      });
  }, []);
  // return the two pieces of state
  return {
    hotSlices,
    slicemasters,
  };
}
