const axios = require("axios");
const {url, config} = require("./constants");

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const params = [
    {
      key: "start_date",
      value: "2022-06-26"
    },
    {
      key: "end_date",
      value: "2022-07-26"
    },
    {
      key: "currencies",
      value: [fromCurrency, toCurrency].join(',')
    }
  ]

  let paramsToString = params.map((item) => `${item.key}=${item.value}`)
    .join("&")

  const response = await axios.get(`${url}?${paramsToString}`, config)

  return response.data
}


getExchangeRate("UZS", "EUR")
