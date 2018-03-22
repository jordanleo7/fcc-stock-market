import gql from 'graphql-tag';

const StocksQuery = gql`
  query getStocksQuery {
    stocks {
      id
      ticker
    }
  }
`

export { StocksQuery };
