import React from 'react';
import '../App.css';
import firebase from '../firebase.js';

class Form extends React.Component {
  
	constructor(){
        super();
        this.state = {
			currentItem: '',
			username: '',
			items: []
		  }
		  this.handleChange = this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
		}


	//upddates the input
	handleChange(e) {
		console.log('Handling Change!!');
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	//när man trycker på knappen
	handleSubmit(e) {
		console.log('Handling submit!!');
		//så att inte sidan automatiskt uppdateras
		e.preventDefault();
		//skapar ett ställe i firebase där alla items till personen lagras. Vi vill alltså lagra dom i "items"
		const itemsRef = firebase.database().ref('items');
		//Vi tar och lagrar användarens username och Currentitem till ett objekt
		const item = {
			title: this.state.currentItem,
			user: this.state.username,
		};
		//skickar en kopia av item vi nyss skapa till firebase
		itemsRef.push(item);
        //tömmer input så vi kan skriva nya saker
        console.log("borde tömma placeholder");
		this.setState({
			currentItem: '',
			username: '',
		});
	}
	render() {
		return (
			<div>
				<section className="add-item">
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="username"
							placeholder="Vad heter du?"
                            onChange={this.handleChange = (e) => {
                                console.log('Handling Change!!');
                                this.setState({
                                    [e.target.name]: e.target.value,
                                });
                              }
                            }
							value={this.state.username}
						/>
						<input
							type="text"
							name="currentItem"
							placeholder="Vad tar du med?"
							onChange={this.handleChange}
							value={this.state.currentItem}
						/>
						<button>Lägg till!</button>
					</form>
				</section>
			</div>
		);
	}
}

export default Form;
