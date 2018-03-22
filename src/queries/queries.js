import gql from 'graphql-tag';

const getStocksQuery = gql`
  {
    stocks {
      name
    }
  }
`

export { getStocksQuery };