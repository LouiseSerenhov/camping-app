import React from 'react';
import '../App.css';
import firebase from '../firebase.js';

class Item extends React.Component {


    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
      }	

	render() {
		return (
			<div>
				<li key={this.props.item.id}>
					<h3>{this.props.item.title}</h3>
					<p>
						brought by: <strong>{this.props.item.user}</strong>
						<button onClick={() => this.removeItem(this.props.item.id)}>Remove Item</button>
					</p>
				</li>
			</div>
		);
	}
}

export default Item;
