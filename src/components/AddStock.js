import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const addStock = gql`
  mutation addStock($name: String!) {
    addStock(name: $name) {
      name
    }
  }
`

class AddStock extends Component {

  handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(this.form)
    this.props
      .mutate({ variables: { name: formData.get('stock') } })
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

AddStock = graphql(addStock)(AddStock);
export default AddStock
