import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// We are going to destructure the props into:
// Locationn, children, descriptionn, title, image

// Add lang so the browser knows what language your browswer is
// Very basic SEO thing to do for all of your websites

// React Helmet can take title templates
// Allows you to specify a title - will manually append this onto each one
// We can query the data for our website from our siteMetadata
// Q - how do we query data into a component when we are NOT at a page level?
// ANSWER - Static query
// NOTE -- This query is pulling data from gatsby-config.js, which displays top-level details about your website

// We need to import useStaticQuery and graphql
// To test, go into a page (like Pizza.js). Put the SEO tag whever we want.
// TIP - Dont put into the PizzaGrid - mixes markup and metadata. Instead, put a fragment tag aroudn the entire thing, and then add the SEO tag at the top

// Next, interpolate the name from the query
// Slicks Slices is added to the Title tag for each pizza

// Fav Icons
// By default, Gatsby looks in the static directory and looks for favico.ico - browsers do that in general. Put it there as a basic backup
// Also provide a backup which is .ico for browsers that do not support SVG

// You can use location to pass in a URL if it is slightly different (if, for example, you have query parameters that you do not want being shared)
export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons. First time we are using static folder */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {/* Open Graph. Specification for meta tags for FB, Twitter, Pinterest, etc. - anything that wants to get your info about the site */}
      {location && <meta property="og:url" content={location.href} />}
      {/* Pass in custom image or fallback to logo.svg */}
      <meta property="og:image" content={image || 'logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.tite}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      {/* If you want to add in another tag, take children passed to the SEO & put in at the bottom. Can then Open/Close SEO tag and add tags within Open/Close */}
      {children}
    </Helmet>
  );
}
