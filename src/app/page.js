"use client";
import { useState, useEffect } from "react";
import { currency_api } from "../../currency_api";
import CurrencyAPI from "@everapi/currencyapi-js";
import CurrencyFlag from "react-currency-flags";

export default function Home() {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("CAD");
  const [toCurrency, setToCurrency] = useState([
    "USD",
    "JPY",
    "EUR",
    "GBP",
    "KRW",
  ]);
  const [exchangeRates, setExchangeRates] = useState({
    USD: {
      code: "USD",
      value: 0.73,
    },
    EUR: {
      code: "EUR",
      value: 0.67,
    },
    GBP: {
      code: "GBP",
      value: 0.57,
    },
    KRW: {
      code: "KRW",
      value: 997.44,
    },
    JPY: {
      code: "JPY",
      value: 114.12,
    },
    CAD: {
      code: "CAD",
      value: 1,
    },
  });

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
    // console.log(amount);
  };

  const currencyChange = (e, i) => {
    const newToCurrency = [...toCurrency];
    newToCurrency[i] = e.target.value;
    setToCurrency(newToCurrency);
  };

  // useEffect(() => {
  //   const getExchangeRates = async () => {
  //     const client = new CurrencyAPI(currency_api);
  //     const response = await client.latest({ base_currency: fromCurrency });
  //     setExchangeRates(response.data);
  //     console.log(response.data);
  //   };

  //   getExchangeRates();
  // }, [fromCurrency]);

  return (
    <div class="flex items-center my-5 flex-col">
      <div class="flex items-center flex-col max-w-2xl">
        <h1 class="text-3xl">How Much</h1>
        <p class="text-lg my-2">
          Exchange rate application for currency conversion
        </p>
        {/* Main container */}
        <div class="flex gap-4 w-full">
          {/* First container for currency to convert */}
          <div class="rounded-md border-inherit w-1/2 flex flex-col p-2 bg-slate-950 h-auto">
            <p>From Currency</p>
            <CurrencyFlag currency={fromCurrency} />
            <input
              placeholder={0}
              value={amount}
              onChange={handleAmountInput}
              type="number"
              class="bg-inherit text-6xl border-0 text-emerald-500 outline-none text-center grow"
            />
            <select
              class="bg-inherit border-0 outline-none max-w-16 self-end mt-auto"
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {Object.keys(exchangeRates).map((exchangeRate) => (
                <option
                  key={exchangeRate}
                  value={exchangeRate}
                  selected={exchangeRate === fromCurrency}
                >
                  {exchangeRate}
                </option>
              ))}
            </select>
          </div>
          {/* Second container displaying all currency conversions */}
          <div class="w-1/2 p-2 rounded-md bg-slate-950">
            <p>To Currency</p>
            {toCurrency.map((currency, i) => (
              <div key={i} class="flex gap-2 bg-inherit">
                <p class="text-green-400 font-bold text-xl">
                  {Math.round(
                    !amount ? 0 : amount * exchangeRates[currency].value * 100
                  ) / 100}
                </p>
                <CurrencyFlag currency={currency} />
                <select
                  class="bg-inherit border-0 outline-none max-w-16"
                  onChange={(event) => currencyChange(event, i)}
                >
                  {Object.keys(exchangeRates).map((exchangeRate) => (
                    <option
                      key={exchangeRate}
                      value={exchangeRate}
                      selected={exchangeRate === currency}
                    >
                      {exchangeRate}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
