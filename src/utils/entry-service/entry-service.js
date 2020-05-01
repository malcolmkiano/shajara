import React from 'react'
import moment from 'moment'

import { Entry } from '../../components'


/** returns a single entry for the date today
 * @param {[]} entries array of entries to search through
*/
function getToday(entries = []) {
  return entries && entries.filter(e => moment().isSame(e.date_created, 'day'))[0]
}


/**
 * returns the number of consecutive days the user has made entries 
 * @param {[]} entries array of entries to search through
 */
function getStreak(entries = []) {
  let streak = 0
  let output = ''

  const includeToday = getToday(entries) ? 0 : 1

  for (const entry of sort(entries)) {
    const dayBefore = moment().subtract(streak + includeToday, 'days')
    if (moment(entry.date_created).isSame(dayBefore, 'day')) {
      streak++
    } else {
      break
    }
  }

  // only show streak message if they've got more than 1 day
  if (streak > 1) output = (
    <p className="streak">
      <span role="img" aria-label="streak">🔥</span>
      You've got a {streak} day streak!
    </p>
  )
  
  return output
}


/**
 * returns a list of entries for the week
 * @param {[]} entries array of entries to search through
 */
function getWeek(entries = []) {
  return sort(entries).filter(e => (
    moment(e.date_created).isSame(moment(), 'week') // calendar week
  ))
}


/**
 * returns entries for a given month
 * @param {[]} entries array of entries to filter
 * @param {Date} [date] the date to get the month data from
 */
function getMonth(entries = [], date = moment()) {
  return sort(entries).filter(e => moment(e.date_created).isSame(date, 'month'))
}


/**
 * returns entries for a given year
 * @param {[]} entries array of entries to filter
 * @param {Date} [date] the date to get the year data from
 */
function getYear(entries = [], date = moment()) {
  return sort(entries).filter(e => moment(e.date_created).isSame(date, 'year'))
}


/**
 * searches through an array of entries using a keyword
 * @param {string} keyword keyword to search for
 * @param {[]} entries array of entries to search through
 */
function search(keyword, entries = []) {
  let output = []
  if (keyword) {
    const results = sort(entries).filter(e =>
      e.content.toLowerCase().includes(keyword.toLowerCase()))
    const months = group(results)
    output = months
  }

  return output
}


/**
 * returns a list of months from entries
 * @param {[]} entries array of entries to grab months from
 */
function listMonths(entries = []) {
  // grabs month name from each group
  let months = group(entries).map(e => e[0])

  // adds in the current month even if there aren't any entries
  const currentMonth = moment().format('MMM YYYY')
  if (!months.includes(currentMonth)) months = [currentMonth, ...months]

  return months
}


/**
 * returns an Entry component for an entry object
 * @param {{}} entry entry object to create a component for
 * @param {function} onClick The function to call when the entry is clicked
 * @param {Boolean} isToday add custom class if entry is today's
 */
function makeComponent(entry, onClick, isToday = false) {
  return (
    <Entry
      key={entry && entry.date_created}
      isToday={isToday}
      onClick={onClick}
      item={entry} />
  )
}


/**
 * sorts a list of entries from most recent to oldest
 * @param {[]} entries array of entries to sort
 */
function sort(entries = []) {
  return [...entries].sort((a, b) =>
    !!(moment(a.date_created).isBefore(b.date_created, 'day')) // if second date is before current date
      ? 1 // put second date first
      : -1 // put first date first
  )
}


/**
 * groups a list of entries by month
 * @param {[]} entries list of entries to group
 */
function group(entries = []) {
  const months = {}
  sort(entries).forEach(entry => {
    const month = moment(entry.date_created).format('MMM YYYY')
    if (!months[month]) months[month] = []
    months[month].push(entry)
  })
  return Object.entries(months)
}


export default {
  getStreak, getToday, getWeek, getMonth, getYear,
  search, listMonths, sort,
  makeComponent
}