import React from 'react'
import m from 'moment'

import { Entry } from '../components'

/** returns a single entry for the date today
 * @param {[]} entries array of entries to search through
*/
function getToday(entries) {
  return entries.filter(e => m().isSame(e.date, 'day'))[0]
}

/**
 * returns entries for a given month
 * @param {[]} entries array of entries to filter
 * @param {Date} [date] the date to get the month data from
 */
function getMonth(entries, date=m()) {
  return sort(entries).filter(e => m(e.date).isSame(date, 'month'))
}

/**
 * returns a list of entries not including today
 * @param {[]} entries array of entries to search through
 * @param {number} [limit] number of entries to return
 */
function getNotToday(entries, limit=7) {
  return getMonth(entries).filter(e => (
    !m().isSame(e.date, 'day') &&
    !m(e.date).isBefore(m().subtract(limit, 'days'))
  ))
}

/**
 * sorts a list of entries from most recent to oldest
 * @param {[]} entries array of entries to sort
 */
function sort(entries) {
  return [...entries].sort((a, b) => {
    return !!(m(a.date).isBefore(b.date, 'day')) // if second date is before current date
      ? 1 // put second date first
      : -1 // put first date first

      // we don't need to check for the "same date" since only one entry can exist per date
  })
}

/**
 * returns an Entry component for an entry object
 * @param {{}} entry entry object to create a component for
 * @param {function} onClick The function to call when the entry is clicked
 * @param {Boolean} isToday add custom class if entry is today's
 */
function makeComponent(entry, onClick, isToday=false, isFirst=false) {
  return (
    <Entry
      type={isToday ? 'today' : ''}
      onClick={onClick}
      content={entry}
      first={isFirst}/>
  )
}


export default {
  getToday,
  getMonth,
  getNotToday,
  makeComponent
}