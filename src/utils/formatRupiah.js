import currency from "currency.js"

export const formatRupiah= money=> {
  return currency(money, {
    separator: ".",
    precision: 0,
    pattern: "IDR #"
  }).format()
}