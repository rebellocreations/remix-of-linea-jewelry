const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function parseCartLines(lines) {
  if (!lines || typeof lines !== 'string') return [];

  return lines
    .split(',')
    .map(line => {
      const separatorIndex = line.lastIndexOf(':');
      if (separatorIndex <= 0) return null;

      const variantId = line.slice(0, separatorIndex);
      const quantity = Math.max(1, Math.round(Number(line.slice(separatorIndex + 1))));
      if (!variantId || !Number.isFinite(quantity)) return null;

      return {
        merchandiseId: variantId,
        quantity,
      };
    })
    .filter(Boolean);
}

export default async function handler(request, response) {
  const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  const apiVersion = process.env.VITE_SHOPIFY_API_VERSION || '2025-07';

  if (!storeDomain || !storefrontToken) {
    response.status(500).send('Missing Shopify checkout configuration.');
    return;
  }

  const requestUrl = new URL(request.url, `https://${request.headers.host}`);
  const lines = parseCartLines(requestUrl.searchParams.get('lines'));

  if (lines.length === 0) {
    response.redirect(302, '/collections');
    return;
  }

  const shopifyResponse = await fetch(`https://${storeDomain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({
      query: CART_CREATE_MUTATION,
      variables: {
        input: { lines },
      },
    }),
  });

  if (!shopifyResponse.ok) {
    response.status(502).send('Could not create Shopify checkout.');
    return;
  }

  const payload = await shopifyResponse.json();
  const userErrors = payload?.data?.cartCreate?.userErrors || [];
  if (userErrors.length > 0) {
    response.status(400).send(userErrors.map(error => error.message).join(', '));
    return;
  }

  const checkoutUrl = payload?.data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    response.status(502).send('Shopify did not return a checkout URL.');
    return;
  }

  response.redirect(302, checkoutUrl);
}
