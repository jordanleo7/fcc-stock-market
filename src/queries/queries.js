import gql from 'graphql-tag';

const StockQuery = gql`
  query StockQuery {
    stocks {
      id
      ticker
    }
  }
`

export { StockQuery };
