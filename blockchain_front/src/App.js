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
			ethAmount: '',
			message: ''
		}
	}

	async componentDidMount() {

		console.log('Methods ---', lottery.methods)
		const manager = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance = await web3.eth.getBalance(lottery.options.address);

		this.setState({ manager, players, balance });
	}

	onSubmit = async (event) => {
		event.preventDefault();
		const accounts = await web3.eth.getAccounts();

		this.setState({ message: 'Waiting for your transaction to succeeded .....' })

		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.ethAmount, 'ether')
		});

		this.setState({ message: 'You are successfully registered in lottery contract.' })

	}

	pickWinner = async (event) => {
		const accounts = await web3.eth.getAccounts();

		this.setState({ message: 'Please wait, we are picking up a winner .....' });

		await lottery.methods.pickWinner().send({
			from: accounts[0],
		});

		this.setState({ message: 'Congrats winner has been picked. Please check your account balance.' })
	}

	render() {
		// web3.eth.getAccounts().then(console.log);
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title"><b>Lottery Contract</b></h1><br /><br />
				</header> <br/> <br /><br/> <br />
				<div className='container col-lg-12'>
					{/* <h2> <b> ----------  ---------- </b></h2> */}<br /><br />
					<div className = 'col-lg-6 panel panel-primary' style = {{ height: '246px' }}><br />
						<p>
							This contract is managed by <b>{this.state.manager}</b> <br /><br />
							There are currently <b>{this.state.players.length}</b> user's registered<br /><br />
							competing to win <b>{web3.utils.fromWei(this.state.balance, 'ether')}</b> ether's.
						</p>
					</div>
					<div className = 'col-lg-6 panel panel-primary'>
						<form onSubmit={this.onSubmit}>
							<h3><b>Want to try your luck !!!</b></h3><br />
							<div className="form-group col-lg-12">
								<label>Amount of ether to enter:</label>
								<input
									value={this.state.ethAmount}
									onChange={event => this.setState({ ethAmount: event.target.value })}
									type='number'
									maxLength='2'
									className='form-control col-lg-3'
								/>
							</div>
							<div className="checkbox">
								{/* <label><input type="checkbox"/> Remember me</label> */}
							</div>
							<button type="submit" className="btn btn-primary">Enter</button> <br/> <br /><br/> <br />
						</form>
					</div> 
				</div>
				<div>
					<br /> <br /><br /><br />
					<label> -------- Click button to pick a Winner -------- </label><br />
					<label> (Only manager can pick a winner)</label><br /><br />
					<div className="form-group col-lg-12">
						<button type="submit" onClick = { this.pickWinner }  className="btn btn-success">Pick Winner</button> <br/> <br /><br/> <br />
					</div>
				</div>

				<br/> <br />
				<h2><b>{this.state.message}</b></h2>

			</div>
		);
	}
}
export default App;
