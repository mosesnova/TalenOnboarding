
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export class FetchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            id: '',
            name: '',
            price: '',
            showModal: false

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {
        let self = this;

        fetch('/api/Products', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ product: data });

            console.log("Customer", self.state.store);
        }).catch(err => {
            console.log("caught it", err);
        });

    }


    handleOpenModal(member) {
        this.setState({
            name: member.name,
            price: member.price,
            id: member.id,
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }


    handleEdit(event) {
        //alert("Edit");
        event.preventDefault();
        var data = {
            name: this.state.name,
            price: this.state.price,
            id: this.state.id
        };

        //let that = this;

        fetch('api/Product/' + data.id, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)

        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log("Success", data);
        });

    }

    render() {
        return (<div><h1>Fetch Product</h1>
            <Link to="/AddProduct">AddProduct</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.product.map(member =>
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.price}</td>
                                <td><a onClick={() => this.handleOpenModal(member)}><button class="ui button">Edit</button></a><a><button class="ui button">Delete</button></a></td>
                            </tr>)
                    }
                </tbody>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                > <form onSubmit={this.handleEdit} method="PUT">
                        <h1>Edit Store</h1> <br />
                        <label>Name</label>
                        <input onChange={this.logChange} value={this.state.name} name='name' />
                        <label>Price</label>
                        <input onChange={this.logChange} value={this.state.price} name='price' />
                        <button>Submit</button>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </form>
                </ReactModal>
            </table>
        </div>);
    }
}