export default function FormatCurrency(currency) {
    return currency.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}