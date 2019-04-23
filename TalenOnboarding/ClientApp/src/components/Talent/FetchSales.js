import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';
import $ from 'jquery';


export class FetchSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            id: '',
            productName: '',
            customerName: '',
            storeName: '',
            dateSold: '',
            productArray: [],
            customerArray: [],
            storeArray: [],
            dateSoldArray: [],
            pArray: [],
            cArray: [],
            sArray:[],
            showModal: false

        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeFunc = this.onChangeFunc.bind(this);
        this.onChangeCustomerFunc = this.onChangeCustomerFunc.bind(this);
        this.onChangeStoreFunc = this.onChangeStoreFunc.bind(this);

    }
    componentDidMount() {
        let self = this;

        fetch('/api/Sales', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ sales: data });

            console.log("Sales", self.state.sales);
        }).catch(err => {
            console.log("caught it", err);
        });

        fetch('/api/Products', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ productArray: data });
            console.log("ProductArray", self.state.productArray);
            function productName(value, label) {
                this.value = value;
                this.label = label;
            }
            var pArray = [];
            let productArrays = self.state.productArray;
            if (productArrays) {
                $.each(productArrays, function (index, value) {
                    pArray.push(new productName(value.name.trim(), value.name.trim()));
                });
                console.log("New Array", pArray);
                self.setState({ productArray: pArray });
            }
        }).catch(err => {
            console.log("caught it", err);
        });




        fetch('/api/Customers', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ customerArray: data });
            console.log("CustomerArray", self.state.customerArray);
            function customerName(value, label) {
                this.value = value;
                this.label = label;
            }
            var cArray = [];
            let customerArrays = self.state.customerArray;
            if (customerArrays) {
                $.each(customerArrays, function (index, value) {
                    cArray.push(new customerName(value.name.trim(), value.name.trim()));
                });
                console.log("New Array", cArray);
                self.setState({ customerArray: cArray });
            }
        }).catch(err => {
            console.log("caught it", err);
        });

        fetch('/api/Stores', {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ storeArray: data });
            console.log("StoreArray", self.state.storeArray);
            function storeName(value, label) {
                this.value = value;
                this.label = label;
            }
            var sArray = [];
            let storeArrays = self.state.storeArray;
            if (storeArrays) {
                $.each(storeArrays, function (index, value) {
                    sArray.push(new storeName(value.name.trim(), value.name.trim()));
                });
                console.log("New Array", sArray);
                self.setState({ storeArray: sArray });
            }
        }).catch(err => {
            console.log("caught it", err);
        });


    }


    handleOpenModal(member) {
        this.setState({
            productName: member.productName,
            customerName: member.customerName,
            storeName: member.storeName,
            dateSold:member.dateSold,
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
    
    onChangeFunc(optionSelected) {
        this.setState({
            productName: optionSelected.value
        });
    }

    onChangeCustomerFunc(optionSelected) {
        this.setState({
            customerName: optionSelected.value
        });
    }
    onChangeStoreFunc(optionSelected) {
        this.setState({
            storeName: optionSelected.value
        });
    }

    handleEdit(event) {
        //alert("Edit");
        event.preventDefault();
        var data = {
            productName: this.state.productName,
            storeName: this.state.storeName,
            dateSold: this.state.dateSold,
            customerName: this.state.customerName,
            id: this.state.id
        };
        console.log(data);

        //let that = this;

        fetch('api/Sales/' + data.id, {

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
    handleChange(value) {
        this.setState({ value: value })
    }
    render() {
        //const techCompanies = [
        //    { label: "Apple", value: 1 },
        //    { label: "Facebook", value: 2 },
        //    { label: "Netflix", value: 3 },
        //    { label: "Tesla", value: 4 },
        //    { label: "Amazon", value: 5 },
        //    { label: "Alphabet", value: 6 },
        //];
        ////const Option = Select.Option;
        

        console.log("Produ", this.state.productName);
        return (<div><h1>Fetch Sales</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Customer Name</th>
                        <th>Store Name</th>
                        <th>Date Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.sales.map(member =>
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.productName}</td>
                                <td>{member.customerName}</td>
                                <td>{member.storeName}</td>
                                <td>{member.dateSold}</td>
                                <td><a onClick={() => this.handleOpenModal(member)}><button className="ui button">Edit</button></a><a><button className="ui button">Delete</button></a></td>
                            </tr>)
                    }
                </tbody>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                > <form onSubmit={this.handleEdit} method="PUT">
                        <h1>Edit Sales</h1> <br />
                        <label>Product Name</label>
                        <Select onChange={this.onChangeFunc} defaultValue={{ label: this.state.productName, value: this.state.productName }} options={this.state.productArray} />
                       
                        <label>Customer Name</label>
                        <Select onChange={this.onChangeCustomerFunc} defaultValue={{ label: this.state.customerName, value: this.state.customerName }} options={this.state.customerArray} />
                       
                        <label>Store Name</label>
                        <Select onChange={this.onChangeStoreFunc} defaultValue={{ label: this.state.storeName, value: this.state.storeName }} options={this.state.storeArray} />
                       
                        <label>Date Sold</label>
                        <input onChange={this.logChange} value={this.state.dateSold} name='dateSold' /><br />
                        <button>Submit</button>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </form>
                </ReactModal>
            </table>
        </div>);
    }
}