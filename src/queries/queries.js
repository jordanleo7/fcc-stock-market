import gql from 'graphql-tag';

const getStocksQuery = gql`
  {
    stock(ticker: "AAPL") {
      id
      ticker
    }
  }
`

export { getStocksQuery };
