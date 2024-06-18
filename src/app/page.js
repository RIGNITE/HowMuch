"use client";
import { useState, useEffect } from "react";
import { currency_api } from "../../currency_api";
import CurrencyAPI from "@everapi/currencyapi-js";
import CurrencyFlag from "react-currency-flags";
import Select from "react-select";

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

  const [currencies, setCurrencies] = useState({
    CAD: {
      symbol: "CA$",
      name: "Canadian Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "CAD",
      name_plural: "Canadian dollars",
      type: "fiat",
      countries: ["CA"],
    },
    USD: {
      symbol: "$",
      name: "US Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "USD",
      name_plural: "US dollars",
      type: "fiat",
    },
    JPY: {
      symbol: "¥",
      name: "Japanese Yen",
      symbol_native: "￥",
      decimal_digits: 0,
      rounding: 0,
      code: "JPY",
      name_plural: "Japanese yen",
      type: "fiat",
      countries: ["JP"],
    },
    EUR: {
      symbol: "€",
      name: "Euro",
      symbol_native: "€",
      decimal_digits: 2,
      rounding: 0,
      code: "EUR",
      name_plural: "Euros",
      type: "fiat",
    },
    GBP: {
      symbol: "£",
      name: "British Pound Sterling",
      symbol_native: "£",
      decimal_digits: 2,
      rounding: 0,
      code: "GBP",
      name_plural: "British pounds sterling",
      type: "fiat",
    },
    KRW: {
      symbol: "₩",
      name: "South Korean Won",
      symbol_native: "₩",
      decimal_digits: 0,
      rounding: 0,
      code: "KRW",
      name_plural: "South Korean won",
      type: "fiat",
    },
  });

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const currencyChange = (e, i) => {
    const newToCurrency = [...toCurrency];
    newToCurrency[i] = e.value;
    setToCurrency(newToCurrency);
  };

  const currencyOptions = Object.keys(exchangeRates).map((exchangeRate) => ({
    value: exchangeRate,
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "inherit",
        }}
      >
        <CurrencyFlag currency={exchangeRate} size="lg" />
        <span
          style={{
            marginLeft: 8,
            color: "#fff",
          }}
        >
          {exchangeRate}
        </span>
      </div>
    ),
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "inherit",
      border: "none",
      boxShadow: "none",
      "&:hover": {
        borderColor: "inherit",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0f172a",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0052CC" : "inherit",
      color: "inherit",
      "&:hover": {
        backgroundColor: "#0052CC", // or any hover color you prefer
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  // useEffect(() => {
  //   const client = new CurrencyAPI(currency_api);
  //   const getRatesAndCurrencies = async () => {
  //     try {
  //       const [exchangeRateResponse, currenciesResponse] = await Promise.all([
  //         client.latest({ base_currency: fromCurrency }),
  //         client.currencies(),
  //       ]);

  //       setExchangeRates(exchangeRateResponse.data);
  //       setCurrencies(currenciesResponse.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // getRatesAndCurrencies();
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
            <input
              placeholder={0}
              value={amount}
              onChange={handleAmountInput}
              type="number"
              class="bg-inherit text-6xl border-0 text-emerald-500 outline-none text-center grow"
            />
            <Select
              value={currencyOptions.find(
                (option) => option.value === fromCurrency
              )}
              options={currencyOptions}
              onChange={(selectedOption) =>
                setFromCurrency(selectedOption.value)
              }
              styles={customStyles}
            />
          </div>
          {/* Second container displaying all currency conversions */}
          <div class="w-1/2 p-2 rounded-md bg-slate-950">
            <p>To Currency</p>
            {toCurrency.map((currency, i) => (
              <div
                key={i}
                class="flex gap-2 bg-inherit items-center justify-between"
              >
                <p class="text-green-400 font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                  {currencies[currency].symbol}{" "}
                  {Math.round(
                    !amount ? 0 : amount * exchangeRates[currency].value * 100
                  ) / 100}
                </p>
                <Select
                  value={currencyOptions.find(
                    (option) => option.value === toCurrency[i]
                  )}
                  options={currencyOptions}
                  onChange={(event) => currencyChange(event, i)}
                  styles={customStyles}
                  className="min-w-40"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
