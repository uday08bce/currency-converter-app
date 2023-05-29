  import React, { useState, useEffect } from 'react';
  import './App.css';

  const App = () => {
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [conversionHistory, setConversionHistory] = useState([]);

    useEffect(() => {
      const fetchExchangeRates = async () => {
        try {
          const response = await fetch('/api/exchangeRates');
          const data = await response.json();
          setExchangeRates(data);
        } catch (error) {
          console.error('Failed to fetch exchange rates:', error);
        }
      };

      fetchExchangeRates();
    }, []);

    const [exchangeRates, setExchangeRates] = useState({});

    const handleConvert = () => {
      try {
        const rate = exchangeRates[sourceCurrency] && exchangeRates[sourceCurrency][targetCurrency];
        if (!rate) {
          throw new Error(`Exchange rate not found for ${sourceCurrency} to ${targetCurrency}`);
        }

        const convertedAmount = amount * rate;
        setConvertedAmount(convertedAmount);

        const newConversion = {
          sourceCurrency,
          targetCurrency,
          amount,
          convertedAmount,
        };

        setConversionHistory([newConversion, ...conversionHistory.slice(0, 9)]);
      } catch (error) {
        console.error('An error occurred during the conversion:', error);
        setConvertedAmount("Exchange rate not available for the given currency");
      }
    };

    return (
      <div className="App">
        <div>
          <h2>Currency Converter</h2>
          <input
            type="text"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
            placeholder="Source Currency"
          />
          <input
            type="text"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            placeholder="Target Currency"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button onClick={handleConvert}>Convert</button>
          {convertedAmount && (
            <div>
              <h4>Converted Amount: {convertedAmount}</h4>
            </div>
          )}
        </div>
        <div>
          <h2>Conversion History</h2>
          <ul>
            {conversionHistory.map((conversion, index) => (
              <li key={index}>
                {conversion.amount} {conversion.sourceCurrency} = {conversion.convertedAmount}{' '}
                {conversion.targetCurrency}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default App;
