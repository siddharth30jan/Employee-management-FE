import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './FavBanks.css'
import { Loader } from 'rsuite';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FavBanks = ({ allData, favouriteBanks }) => {


    const [myFavouriteBanks, setmyFavouriteBanks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const dataArray = Object.keys(allData).map(val => allData[val]);
    const temp = []
    dataArray.forEach(data => temp.push(...data))

    useEffect(() => {
        setmyFavouriteBanks([])
        favouriteBanks.forEach(element => {
            setmyFavouriteBanks(myFavouriteBanks => [...myFavouriteBanks, temp?.filter(bank => bank?.ifsc === element)[0]])
        });
    }, [])




    const columns = [
        {
            name: 'Bank',
            selector: row => row?.bank_name
        },
        {
            name: 'IFSC',
            selector: row => row?.ifsc
        },
        {
            name: 'Branch',
            selector: row => row?.branch
        },
        {
            name: 'Bank ID',
            selector: row => row?.bank_id
        },
        {
            name: 'Address',
            selector: row => row?.address
        }
    ]

    return (
        <body className="outer">
            {
                <>
                    <DataTable
                        title="Favourite Banks"
                        columns={columns}
                        progressPending={isLoading}
                        progressComponent={<Loader backdrop content="loading..." vertical />}
                        data={myFavouriteBanks}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        highlightOnHover
                        onRowClicked={(row) => {
                            navigate(`/bank-details/${row?.ifsc}`)
                        }}
                        subHeader
                        subHeaderComponent={
                            <div className="filterOptions">
                                <button onClick={() => { navigate(`/all-banks`) }}>Show all banks</button>
                            </div>
                        }

                    />
                    <ToastContainer />
                </>
            }

        </body>
    )
}

export default FavBanks