import React from 'react'
import m from 'moment'

import { Entry } from '../../components'


/** returns a single entry for the date today
 * @param {[]} entries array of entries to search through
*/
function getToday(entries) {
  return entries && entries.filter(e => m().isSame(e.date_created, 'day'))[0]
}


/**
 * returns entries for a given month
 * @param {[]} entries array of entries to filter
 * @param {Date} [date] the date to get the month data from
 */
function getMonth(entries, date = m()) {
  return sort(entries).filter(e => m(e.date_created).isSame(date, 'month'))
}


/**
 * returns a list of entries for the week
 * @param {[]} entries array of entries to search through
 */
function getWeek(entries) {
  return getMonth(entries).filter(e => (
    !m(e.date_created).isBefore(m().subtract(7, 'days'))
  ))
}


/**
 * sorts a list of entries from most recent to oldest
 * @param {[]} entries array of entries to sort
 */
function sort(entries) {
  return (entries && [...entries].sort((a, b) => 
    !!(m(a.date_created).isBefore(b.date_created, 'day')) // if second date is before current date
      ? 1 // put second date first
      : -1 // put first date first

    // we don't need to check for the "same date" since only one entry can exist per date
  )) || []
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
      isToday={isToday}
      onClick={onClick}
      item={entry} />
  )
}


export default {
  getToday,
  getWeek,
  getMonth,
  makeComponent
}