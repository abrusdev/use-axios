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

  const usdToFirst = response.data.quotes["USD" + fromCurrency]
  const usdToSecond = response.data.quotes["USD" + toCurrency]

  const rateLastMonth = usdToFirst['start_rate'] / usdToSecond['start_rate']
  const rateThisMonth = usdToFirst['end_rate'] / usdToSecond['end_rate']

  const difference = rateThisMonth / rateLastMonth
  let rateFeedback;

  if (difference > 1) {
    rateFeedback = roundWith2Digits(difference * 100) + "% increased"
  } else {
    rateFeedback = 100 - roundWith2Digits(difference * 100) + "% decreased"
  }

  return `
    Last Month
    1 ${fromCurrency} = ${rateLastMonth} ${toCurrency}
    
    This Month
    1 ${fromCurrency} = ${rateThisMonth} ${toCurrency}
    
    Rate
    ${rateFeedback}
  `
}

function roundWith2Digits(digit) {
  return parseFloat(digit.toString()).toFixed(2)
}

getExchangeRate("UZS", "EUR").then(r =>
  console.log(r)
)
