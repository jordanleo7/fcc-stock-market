import gql from 'graphql-tag';
// import {gql} from "react-apollo";

const getStocksQuery = gql`
  {
    stocks {
      id
      ticker
    }
  }
`;

export { getStocksQuery };
