import { BigNumber } from "ethers"
import { commify, formatUnits, parseUnits } from "ethers/lib/utils"

export const getBnToNumber = (bn: BigNumber, decimals = 18) => {
  return bn ? parseFloat(formatUnits(bn, decimals)) : 0
}

export const getCurrencySymbol = (locale: string, currency: string) => (0).toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim()

export const formatNumber = (n: number, decimals = 2, decimalsMin = 2): string => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimalsMin,
    maximumFractionDigits: decimals
  })
}

export const formatNumberWithCurrency = (n: number, decimals = 2, decimalsMin = 2) => {
  return `$${formatNumber(n, decimals, decimalsMin)}`
}

export const formatPercent = (n: number, decimals = 2) => {
  return `${formatNumber(n, decimals)}%`
}

export const formatPercentDecimal = (n: number, decimals = 2) => {
  return `${formatNumber(n * 100, decimals, decimals)}%`
}

export const getValueOrMinPrecisionValue = (value: number, precision = 2) => {
  const minPrecisionValue = 1 / Math.pow(10, precision)
  const isLowerThanMinPrecision = Math.abs(value) > 0 && Math.abs(value) < minPrecisionValue
  return isLowerThanMinPrecision ? minPrecisionValue : value
}

export const removeScientificFormat = (x: number) => {
  if (!x) { return x }
  let v: any = x
  if (Math.abs(v) < 1.0) {
    var e = parseInt(v.toString().split('e-')[1])
    if (e) {
      v *= Math.pow(10, e - 1)
      v = '0.' + (new Array(e)).join('0') + v.toString().substring(2)
    }
  } else {
    var e = parseInt(v.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      v /= Math.pow(10, e)
      v += (new Array(e + 1)).join('0')
    }
  }
  return v
}

function toFixed(num: number, fixed = 2) {
  try {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
    return (removeScientificFormat(num).toString() || '0').match(re)[0]
  } catch (e) { }
  return num.toFixed(fixed)
}


export const roundFloorString = (v: number, precision = 8): string => {
  return toFixed(v, precision)
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}