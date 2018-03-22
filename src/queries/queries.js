import gql from 'graphql-tag';

const getStocksQuery = gql`
  query getStocksQuery {
    stocks {
      id
      ticker
    }
  }
`;

export { getStocksQuery };
