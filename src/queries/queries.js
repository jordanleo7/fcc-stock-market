import gql from 'graphql-tag';

const getStockQuery = gql`
  query getStockQuery($ticker: String!) {
    stock(ticker: $ticker) {
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

const addStockMutation = gql`
  mutation addStockMutation($ticker: String!) {
    addStock(ticker: $ticker) {
      id
      ticker
    }
  }
`

export { getStockQuery, getStocksQuery, addStockMutation };
