import gql from 'graphql-tag';

const getStocksQuery = gql`
  {
    stocks {
      ticker
    }
  }
`

export { getStocksQuery };
