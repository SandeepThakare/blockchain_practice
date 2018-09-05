import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      manager: '',
      players: [],
      balance: '',
      ethAmount: ''
    }
  }

  async componentDidMount() {

    console.log('Methods ---', lottery.methods)
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
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
          {/* <h2> <b> ----------  ---------- </b></h2> */}<br /><br />
          <p>
            This contract is managed by <b>{this.state.manager}</b> <br /><br />
            There are currently <b>{this.state.players.length}</b> <br /><br />
            competing to win <b>{web3.utils.fromWei(this.state.balance, 'ether')}</b> ether's.
          </p>

          <hr />

          <form>
            <div>
              <h3><b>Want to try a luck !!!</b></h3><br />
              <input
                value={this.state.ethAmount}
                onChange={event => this.setState({ ethAmount: event.target.value })}
              />
            </div> <br/> <br/>
            <button> Enter </button>
          </form>

        </div>
      </div>
    );
  }
}

export default App;
