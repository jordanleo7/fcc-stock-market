import gql from 'graphql-tag';

const getStockQuery = gql`
  {
    stock(ticker: "AAPL") {
      id
      ticker
    }
  }
`

const getStocksQuery = gql`
  {
    stocks {
      id
      ticker
    }
  }
`

export { getStockQuery, getStocksQuery };
