import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './BankDetails.css'
import { Loader } from 'rsuite';
import { useParams } from 'react-router';



const BankDetails = ({ filteredBankData }) => {
    const params = useParams()
    const bank = filteredBankData.filter(bank => bank?.ifsc === params?.ifscCode)[0]
    return (
        <div className="parent">
            <h1>Bank Details </h1>
            <div className="container">
                <div className="innerContainer1">
                    <div>Bank Name: {bank.bank_name}</div>
                    <div>Address: {bank.address}</div>
                </div>
                <div className="innerContainer2">
                    <div>Branch: {bank.branch}</div>
                    <div>City: {bank.city}</div>
                </div>
                <div className="innerContainer3">
                    <div>District: {bank.district}</div>
                    <div>City: {bank.city}</div>
                    <div>State: {bank.state}</div>
                </div>
            </div>
        </div>
    )
}

export default BankDetails