import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      manager: ''
    }
  }

  async componentDidMount() {

    console.log('Methods ---', lottery.methods)
    const manager = await lottery.methods.manager().call();

    this.setState({ manager })
  }

  render() {
    // web3.eth.getAccounts().then(console.log);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lottery Contract</h1>
        </header>
        <div>
          {/* <h2> <b> ----------  ---------- </b></h2> */}<br/><br/>
          <p> This contract is managed by {this.state.manager} </p>
        </div>
      </div>
    );
  }
}

export default App;
