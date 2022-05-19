import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './BankTable.css'
import { Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BankTable = ({ bankData, setBankData, filteredBankData, setFilteredBankData, setFavouriteBanks, favouriteBanks, selectedCity, setSelectedCity, setAllData, allData }) => {


    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const notify = () => toast("Something went wrong..");

    const getBankData = async () => {
        try {
            setIsLoading(true)
            if (allData[selectedCity]) {
                setBankData(allData[selectedCity])
                setFilteredBankData(allData[selectedCity])
            } else {
                const response = await axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`)
                const structuredBankData = response?.data?.map(entry => { return { ...entry, isFav: false } });
                setBankData(structuredBankData)
                setFilteredBankData(structuredBankData)
                setAllData(allData => { return { ...allData, [selectedCity]: structuredBankData } })

            }
        } catch (err) {

            notify()
        }
        setIsLoading(false)
    }

    const postFilterBankData = (paramToSearch) => {

        if (search) {
            let searchParam = search.trim()
            const result = bankData?.filter(bank => {
                return bank[`${paramToSearch}`]?.toLowerCase()?.match(searchParam?.toLowerCase())
            })
            setFilteredBankData(result)
        } else {
            setFilteredBankData(bankData)
        }
    }


    const cityOptions = [
        'MUMBAI', 'DELHI', 'BANGALURU', 'NOIDA', 'GURUGRAM'
    ];
    const categoryOptions = [
        'IFSC', 'Branch', 'Bank name'
    ];
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
        },
        {
            name: 'Set favourite',
            cell: row => {
                const showAdd = !favouriteBanks.includes(row?.ifsc)

                return <button
                    onClick={() => {
                        if (showAdd) setFavouriteBanks([...favouriteBanks, row?.ifsc])
                        else {
                            for (let i = 0; i < favouriteBanks.length; i++) {

                                if (favouriteBanks[i] === row?.ifsc) {

                                    favouriteBanks.splice(i, 1);
                                    break;
                                }

                            }

                            setFavouriteBanks([...favouriteBanks])


                        }
                    }}
                >
                    {showAdd ? 'Add' : 'Remove'}
                </button>
            }
        },
    ]
    useEffect(() => {
        getBankData()
    }, [])

    useEffect(() => {
        let paramToSearch = ''
        if (selectedCategory === 'IFSC') paramToSearch = 'ifsc'
        else if (selectedCategory === 'Branch') paramToSearch = 'branch'
        else paramToSearch = 'bank_name'
        postFilterBankData(paramToSearch)
    }, [search])

    useEffect(() => {
        let task = async () => {
            getBankData()
            setSearch('')
        }
        task()
    }, [selectedCity])

    useEffect(() => {
        setSearch('')
    }, [selectedCategory])

    return (
        <body className="outer">
            {
                <>
                    <DataTable
                        title="All Banks"
                        columns={columns}
                        progressPending={isLoading}
                        progressComponent={<Loader backdrop content="Loading..." vertical />}
                        data={filteredBankData}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <div className="filterOptions">
                                <button onClick={() => { navigate(`/favourites`) }}>Show fav banks</button>
                                <Dropdown
                                    name="city"
                                    className="cityDropdown"
                                    options={cityOptions}
                                    onChange={(city) => setSelectedCity(city?.value)}
                                    value={selectedCity}
                                    placeholder="Select City" />
                                <Dropdown
                                    name="category"
                                    className="categoryDropdown"
                                    options={categoryOptions}
                                    onChange={(category) => setSelectedCategory(category?.value)}
                                    value={selectedCategory}
                                    placeholder="Select Category" />
                                <input
                                    name="searchInput"
                                    className="inputSearch"
                                    type="text"
                                    disabled={!selectedCategory}
                                    placeholder="Search.. (Ensure category selection)"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        }
                        onRowClicked={(row) => {
                            navigate(`/bank-details/${row?.ifsc}`)
                        }}

                    />
                    <ToastContainer />
                </>
            }

        </body>
    )
}

export default BankTable