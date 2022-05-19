import React, { useEffect, useState } from 'react'
import BankTable from "./components/BankTable";
import BankDetails from "./components/BankDetails/BankDetails";
import FavBanks from "./components/FavBanks/FavBanks";

import { HashRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  const [bankData, setBankData] = useState([])
  const [filteredBankData, setFilteredBankData] = useState([])
  const [favouriteBanks, setFavouriteBanks] = useState([])
  const [selectedCity, setSelectedCity] = useState('MUMBAI')
  const [allData, setAllData] = useState({})

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/all-banks" element={<BankTable
            bankData={bankData}
            setBankData={setBankData}
            filteredBankData={filteredBankData}
            setFilteredBankData={setFilteredBankData}
            favouriteBanks={favouriteBanks}
            setFavouriteBanks={setFavouriteBanks}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            allData={allData}
            setAllData={setAllData}
          />} />
          <Route path="/bank-details/:ifscCode" element={<BankDetails filteredBankData={filteredBankData} />} />
          <Route path="/favourites" element={<FavBanks allData={allData} favouriteBanks={favouriteBanks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
