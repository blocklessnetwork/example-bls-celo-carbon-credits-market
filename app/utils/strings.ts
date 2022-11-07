export const formatAddress = (address: string | null | undefined) => {
  return (shortenAddress(address || ''))
}

export const shortenAddress = (address: string) => {
  return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`
}

export const pluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`