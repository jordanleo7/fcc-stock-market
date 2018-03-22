import gql from 'graphql-tag';

const StockQuery = gql`
  query getStocksQuery {
    stocks {
      id
      ticker
    }
  }
`

export { StockQuery };
