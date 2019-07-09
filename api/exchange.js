const axios = require('axios');
const request = require('request');
const Es = require('../lib/es');

const MONETARIES = {
  USD: 'FRX.KRWUSD',
  EUR: 'FRX.KRWEUR',
  JPY: 'FRX.KRWJPY',
  CNY: 'FRX.KRWCNY',
  GBP: 'FRX.KRWGBP',
  CAD: 'FRX.KRWCAD',
  CHF: 'FRX.KRWCHF',
  HKD: 'FRX.KRWHKD',
  SEK: 'FRX.KRWSEK',
  AUD: 'FRX.KRWAUD',
  DKK: 'FRX.KRWDKK',
  NOK: 'FRX.KRWNOK',
  SAR: 'FRX.KRWSAR',
  KWD: 'FRX.KRWKWD',
  BHD: 'FRX.KRWBHD',
  AED: 'FRX.KRWAED',
  SGD: 'FRX.KRWSGD',
  MYR: 'FRX.KRWMYR',
  NZD: 'FRX.KRWNZD',
  THB: 'FRX.KRWTHB',
  IDR: 'FRX.KRWIDR',
  INR: 'FRX.KRWINR',
  ZAR: 'FRX.KRWZAR',
  RUB: 'FRX.KRWRUB',
  TWD: 'FRX.KRWTWD',
  VND: 'FRX.KRWVND',
  PHP: 'FRX.KRWPHP',
  MXN: 'FRX.KRWMXN',
  BRL: 'FRX.KRWBRL',
  QAR: 'FRX.KRWQAR',
  OMR: 'FRX.KRWOMR',
  HUF: 'FRX.KRWHUF',
  PLN: 'FRX.KRWPLN',
  TRY: 'FRX.KRWTRY',
  KZT: 'FRX.KRWKZT',
  CZK: 'FRX.KRWCZK',
  PKR: 'FRX.KRWPKR',
  BDT: 'FRX.KRWBDT',
  EGP: 'FRX.KRWEGP',
  BND: 'FRX.KRWBND',
  ILS: 'FRX.KRWILS',
  JOD: 'FRX.KRWJOD',
  MNT: 'FRX.KRWMNT',
  DZD: 'FRX.KRWDZD',
  LKR: 'FRX.KRWLKR',
  CLP: 'FRX.KRWCLP',
  KES: 'FRX.KRWKES',
  TZS: 'FRX.KRWTZS',
  COP: 'FRX.KRWCOP'
};

const URL = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=';

const index = (req, res, next) => {
  const { params: { monetary } } = req;
  const code = MONETARIES[String(monetary).toUpperCase()];

  if (!code) {
    return next(new Error("Invalid monetary"));
  }

  axios.get(URL + code)
    .then(({ data }) => {
      const raw = data[0];
      const body = {
        id: raw.id,
        code: raw.code,
        monetary: raw.currencyCode,
        country: raw.country,
	      basePrice: raw.basePrice, 
	      krwRate: Number(Number(1 / raw.basePrice).toPrecision(6)),
	      provider: raw.provider,
	      createdAt: new Date(raw.createdAt).valueOf(), 
	      modifiedAt: new Date(raw.modifiedAt).valueOf()
      };

      return Es.index("exchange", "exchange", body)
        .then(() => Es.search("exchange", { query: { match_all: {} } }))
        .then(response => res.json(response))
    })
    .catch(next);
};

const index2 = (req, res, next) => {
  const { params: { monetary } } = req;
  const code = MONETARIES[String(monetary).toUpperCase()];

  if (!code) {
    return next(new Error("Invalid monetary"));
  }

  request(URL + code, (err, response) => err ? next(err) : res.json(JSON.parse(response.data)));
};

module.exports = {
  index, index2
};
