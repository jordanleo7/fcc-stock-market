import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo'

const mutation = gql`
  mutation AddStock($stock: String!) {
    addStock(stock: $stock) {
      name
    }
  }
`

class AddStock extends Component {

  handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(this.form)
    this.props
      .mutate({ variables: { stock: formData.get('stock') } })
      .then(res => {
        if (res.data.addStock.formErrors === null) {
          window.location.replace(`/`)
        } else {
          console.log(res.data.addStock.formErrors)
        }
      })
      .catch(err => {
        console.log('Network error')
      })
  }

  render() {
    return (
      <div>
        <h1>AddStock</h1>
        <form 
          ref={ref => (this.form = ref)}
          onSubmit={e => this.handleSubmit(e)}
        >
          <input type="text" name="stock" />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

AddStock = graphql(mutation)(AddStock)
export default AddStock