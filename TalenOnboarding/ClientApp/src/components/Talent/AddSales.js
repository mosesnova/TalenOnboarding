import React, { Component } from 'react';
import $ from 'jquery';


export class AddSales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);

    }
    handleSubmit(event) {
        event.preventDefault();
        var data = {
            Name: this.state.name,
            Address: this.state.address
        };
        console.log(data);
        $.ajax({
            url: 'api/Sales',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(data)
        }).then(function (response) {
            console.log('2', data);
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data === "success") {
                this.setState({ msg: "Thanks for registering" });
            }

        }).catch(function (err) {
            console.log(err);
        });

    }
    logChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (<form onSubmit={this.handleSubmit} method="POST">
            <h1>Add Product</h1>
            <label>Name</label>

            <input onChange={this.logChange} value={this.state.name} name='name' />

            <label>Address</label>

            <input onChange={this.logChange} value={this.state.address} name='address' />

            <div><button>Submit</button></div>
        </form>);
    }
}