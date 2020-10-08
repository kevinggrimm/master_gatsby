import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar

export default function SideBar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create a new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>Fuego</strong>)
        .child(
          // Create an editor for the schema type
          // You can customize the Doc ID (string appended to end of URL)
          // Can pass a document ID that doesnt exist and it will make it for us
          S.editor()
            .schemaType('storeSettings')
            // make a nnew document ID so we dont have a random string of numbers
            .documentId('downtown')
        ),
      // populate in the rest of our document items
      // filter out the `Settings` schema to exclude the ID of storeSettings
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
