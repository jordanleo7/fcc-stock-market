import gql from 'graphql-tag';

const getStocksQuery = gql`
  {
    stocks {
      id
      ticker
    }
  }
`

export { getStocksQuery };
