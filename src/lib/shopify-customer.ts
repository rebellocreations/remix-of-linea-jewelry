import { storefrontApiRequest } from './shopify';

// Customer Orders Query
const CUSTOMER_ORDERS_QUERY = `
  query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Customer Addresses Query
const CUSTOMER_ADDRESSES_QUERY = `
  query getCustomerAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        id
      }
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
    }
  }
`;

// Customer Update Mutation
const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        email
        firstName
        lastName
        displayName
        phone
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Address Create Mutation
const CUSTOMER_ADDRESS_CREATE_MUTATION = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Address Update Mutation
const CUSTOMER_ADDRESS_UPDATE_MUTATION = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Address Delete Mutation
const CUSTOMER_ADDRESS_DELETE_MUTATION = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Default Address Update
const CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION = `
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          image: {
            url: string;
            altText: string | null;
          } | null;
          price: {
            amount: string;
            currencyCode: string;
          };
        } | null;
      };
    }>;
  };
}

export interface ShopifyAddress {
  id: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
}

export interface AddressInput {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

interface CustomerUserError {
  field: string[];
  message: string;
  code: string;
}

// Get Customer Orders
export async function getCustomerOrders(accessToken: string, first: number = 20): Promise<ShopifyOrder[]> {
  const data = await storefrontApiRequest(CUSTOMER_ORDERS_QUERY, { 
    customerAccessToken: accessToken, 
    first 
  });
  
  if (!data) return [];
  
  const orders = data.data?.customer?.orders?.edges || [];
  return orders.map((edge: { node: ShopifyOrder }) => edge.node);
}

// Get Customer Addresses
export async function getCustomerAddresses(accessToken: string): Promise<{
  addresses: ShopifyAddress[];
  defaultAddressId: string | null;
}> {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESSES_QUERY, { 
    customerAccessToken: accessToken 
  });
  
  if (!data) return { addresses: [], defaultAddressId: null };
  
  const customer = data.data?.customer;
  const addresses = customer?.addresses?.edges?.map((edge: { node: ShopifyAddress }) => edge.node) || [];
  const defaultAddressId = customer?.defaultAddress?.id || null;
  
  return { addresses, defaultAddressId };
}

// Update Customer Profile
export async function updateCustomerProfile(
  accessToken: string, 
  input: { firstName?: string; lastName?: string; phone?: string }
): Promise<{
  success: boolean;
  errors: CustomerUserError[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_UPDATE_MUTATION, {
    customerAccessToken: accessToken,
    customer: input
  });
  
  if (!data) {
    return { success: false, errors: [{ field: [], message: 'Network error', code: 'NETWORK_ERROR' }] };
  }
  
  const result = data.data?.customerUpdate;
  return {
    success: !!result?.customer,
    errors: result?.customerUserErrors || []
  };
}

// Create Address
export async function createCustomerAddress(
  accessToken: string, 
  address: AddressInput
): Promise<{
  addressId: string | null;
  errors: CustomerUserError[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_CREATE_MUTATION, {
    customerAccessToken: accessToken,
    address
  });
  
  if (!data) {
    return { addressId: null, errors: [{ field: [], message: 'Network error', code: 'NETWORK_ERROR' }] };
  }
  
  const result = data.data?.customerAddressCreate;
  return {
    addressId: result?.customerAddress?.id || null,
    errors: result?.customerUserErrors || []
  };
}

// Update Address
export async function updateCustomerAddress(
  accessToken: string, 
  addressId: string,
  address: AddressInput
): Promise<{
  success: boolean;
  errors: CustomerUserError[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_UPDATE_MUTATION, {
    customerAccessToken: accessToken,
    id: addressId,
    address
  });
  
  if (!data) {
    return { success: false, errors: [{ field: [], message: 'Network error', code: 'NETWORK_ERROR' }] };
  }
  
  const result = data.data?.customerAddressUpdate;
  return {
    success: !!result?.customerAddress,
    errors: result?.customerUserErrors || []
  };
}

// Delete Address
export async function deleteCustomerAddress(
  accessToken: string, 
  addressId: string
): Promise<{
  success: boolean;
  errors: CustomerUserError[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_ADDRESS_DELETE_MUTATION, {
    customerAccessToken: accessToken,
    id: addressId
  });
  
  if (!data) {
    return { success: false, errors: [{ field: [], message: 'Network error', code: 'NETWORK_ERROR' }] };
  }
  
  const result = data.data?.customerAddressDelete;
  return {
    success: !!result?.deletedCustomerAddressId,
    errors: result?.customerUserErrors || []
  };
}

// Set Default Address
export async function setDefaultAddress(
  accessToken: string, 
  addressId: string
): Promise<{
  success: boolean;
  errors: CustomerUserError[];
}> {
  const data = await storefrontApiRequest(CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION, {
    customerAccessToken: accessToken,
    addressId
  });
  
  if (!data) {
    return { success: false, errors: [{ field: [], message: 'Network error', code: 'NETWORK_ERROR' }] };
  }
  
  const result = data.data?.customerDefaultAddressUpdate;
  return {
    success: !!result?.customer,
    errors: result?.customerUserErrors || []
  };
}
