
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";


export class FetchStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: [],
            id: '',
            name: '',
            address: '',
            showModal: false

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {
        let self = this;

        fetch('/api/Stores', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ store: data });

            console.log("Customer", self.state.store);
        }).catch(err => {
            console.log("caught it", err);
        });

    }


    handleOpenModal(member) {
        this.setState({
            name: member.name,
            address: member.address,
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
            address: this.state.address,
            id: this.state.id
        };

        //let that = this;

        fetch('api/Stores/' + data.id, {

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
        return (<div><h1>Fetch Store</h1>
            <Link to="/AddStore">AddStore</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.store.map(member =>
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.address}</td>
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
                        <label>Address</label>
                        <input onChange={this.logChange} value={this.state.address} name='address' />
                        <button>Submit</button>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </form>
                </ReactModal>
            </table>
        </div>);
    }
}