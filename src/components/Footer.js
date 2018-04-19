import React, { Component } from 'react';

class Footer extends Component {

  render() {
    return (
      <footer>
        <div>
          <p>
            Data provided for free by <a href="https://iextrading.com/developer">IEX</a>
          </p>
          <p>
            IEX Terms of Service: <a href="https://iextrading.com/api-exhibit-a">IEX Exhibit A</a>
          </p>
        </div>
        <div>&copy; {new Date().getFullYear()}, Jordan Johnson</div> 
        <span>My <a href="https://github.com/jordanleo7/fcc-stock-market">GitHub</a></span>
      </footer>
    )
  }
}

export default Footer;
