// Intl.NumberFormat is built into the browser as well as Node JS
// First arg: where to put numbers and decimals
// currency in object: will format as that countries' currency needs to be formatted
const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
