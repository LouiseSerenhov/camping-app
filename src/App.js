import React, { Component } from 'react';
import Form from './components/Form.js';
import Item from './components/Item.js';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentItem: '',
			username: '',
			items: [],
			user: null, // <-- auth
		};
		this.login = this.login.bind(this); // <-- auth
		this.logout = this.logout.bind(this); // <-- auth
	}
	login() {
		auth.signInWithPopup(provider).then(result => {
			const user = result.user;
			this.setState({
				user,
			});
		});
	}
	logout() {
		auth.signOut().then(() => {
			this.setState({
				user: null,
			});
		});
	}
	componentDidMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			}
		});

		const itemsRef = firebase.database().ref('items');

		itemsRef.on('value', snapshot => {
			let items = snapshot.val();
			let newState = [];
			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					user: items[item].user,
				});
			}
			this.setState({
				items: newState,
			});
		});
	}

	render() {
		return (
			<div className="app">
				<header>
					<div className="wrapper">
						<h1>Camping sommar 2018</h1>
						{this.state.user ? (
							<button onClick={this.logout}>Log Out</button>
						) : (
							<button onClick={this.login}>Log In</button>
						)}
						<i className="fa fa-shopping-basket" aria-hidden="true" />
					</div>
				</header>
				{this.state.user ? (
					<div>
						<div className="user-profile">
							<img src={this.state.user.photoURL} />
						</div>

						<div className="container">
						{console.log("Snart kmr form")}
							<Form />
							<section className="display-item">
							{console.log("Snart kmr item")}
								<div className="wrapper">
									<ul>
									{console.log("Snart kmr itm2")}
										{this.state.items.map(item => {
											{console.log("Snart kmr itm3")}
											return <Item item={item} />;
										})}
									</ul>
								</div>
							</section>
						</div>
					</div>
				) : (
					<div className="wrapper">
						<p>Logga in! Annars får du inte se något :)</p>
					</div>
				)}
			</div>
		);
	}
}

export default App;
