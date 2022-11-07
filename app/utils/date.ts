const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const formatEpochToGo = (epoch: number): string => {
  const date = new Date(epoch * 1000)
  return dayjs().to(date)
}

export const formatEpochToPrettyDate = (epoch: number): string => {
  const date = new Date(epoch * 1000)
  return dayjs(date).format('MMM D, YYYY')
}

export const formatEpochToPrettyDateTime = (epoch: number): string => {
  const date = new Date(epoch * 1000)
  return dayjs(date).format('MMM D, YYYY h:mm A')
}