import numeral from 'numeral'

export const registerNumeralInfo = () => {
  numeral.register('locale', 'ru-sign', {
    delimiters: {
      thousands: ' ',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'тыс.',
      million: 'млн.',
      billion: 'млрд.',
      trillion: 'трлн.',
    },
    ordinal: function() {
      return '.'
    },
    currency: {
      symbol: '\u20BD',
    },
  })

  numeral.locale('ru-sign')

  numeral.defaultFormat('$ 0')
}
