import React from 'react'
import { gql, graphql } from 'react-apollo'

const mutation = gql`
  mutation AddStock($stock: String!) {
    addStock(stock: $stock) {
      name
    }
  }
`

class AddStock extends Component {
  render() {
    return (
      <div>AddStock</div>
    )
  }
}

