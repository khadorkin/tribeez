import {db, auth} from '../firebase'

import {
  ACTIVITY_LOADED,
  ACTIVITY,
  ACTIVITY_CLEAR,
  ACTIVITY_ADDED,
  ACTIVITY_CHANGED,
  ACTIVITY_REMOVED,
} from '../constants/actions'

import report from './error'

import {oneLine} from '../utils/text'

const FETCH_MAX = 10
const DAYS_NEW = 7 // number of days an item remains considerd "new"

const ONE_DAY = 86400000 // one day = 24 x 60 x 60 x 1000 ms

let refs = []

const on = (tid) => {
  return (dispatch) => {
    const uid = auth.currentUser.uid
    const now = Date.now()

    const tribeRef = db.ref('tribes/' + tid)

    let loaded = 0
    const loadedOne = () => {
      loaded++
      if (loaded === 3) {
        dispatch({
          type: ACTIVITY_LOADED,
        })
      }
    }


    // POLLS

    const pollsRef = tribeRef.child('polls')
    refs.push(pollsRef)

    pollsRef.on('value', (snapshot) => {
      const values = snapshot.val()
      const polls = []
      for (const key in values) {
        const poll = values[key]
        if (!poll.answers || !poll.answers[uid]) {
          polls.push({
            id: key,
            name: poll.name,
            added: poll.added,
            author: poll.author,
          })
        }
      }
      loadedOne()
      dispatch({
        type: ACTIVITY,
        data: {polls},
      })
    }, (error) => {
      dispatch(report(error, 'listenActivity/polls'))
    })


    // TASKS

    const tasksRef = tribeRef.child('tasks')
    refs.push(tasksRef)

    tasksRef.on('value', (snapshot) => {
      const values = snapshot.val()
      const tasks = []
      for (const key in values) {
        const task = values[key]

        if (task.done) {
          const elapsed = now - task.done
          const wait = (task.wait * ONE_DAY) || 600000 // minimum 10 minutes
          if (elapsed < wait) {
            continue // too early => skip
          }
        }

        let minimum
        for (const id in task.counters) {
          const counter = task.counters[id]
          if (minimum === undefined || counter < minimum) {
            minimum = counter
          }
        }
        if (task.counters[uid] > minimum) {
          continue // some members did it less times => skip
        }

        tasks.push({
          id: key,
          name: task.name,
          done: task.done,
        })
      }
      loadedOne()
      dispatch({
        type: ACTIVITY,
        data: {tasks},
      })
    }, (error) => {
      dispatch(report(error, 'listenActivity/tasks'))
    })


    // EVENTS

    const oneHourAgo = now - 3600000

    const eventsRef = tribeRef.child('events').orderByChild('index').startAt(oneHourAgo).limitToLast(FETCH_MAX)
    refs.push(eventsRef)

    const eventsCallback = (type, snapshot) => {
      const value = snapshot.val()

      const row = {
        id: snapshot.key,
        name: value.name,
        start: value.start,
        end: value.end,
      }

      dispatch({
        type,
        in: 'events',
        row,
      })
    }

    eventsRef.on('child_added', eventsCallback.bind(null, ACTIVITY_ADDED), (error) => {
      dispatch(report(error, 'listenActivity/events/added'))
    })
    eventsRef.on('child_changed', eventsCallback.bind(null, ACTIVITY_CHANGED), (error) => {
      dispatch(report(error, 'listenActivity/events/changed'))
    })
    eventsRef.on('child_removed', eventsCallback.bind(null, ACTIVITY_REMOVED), (error) => {
      dispatch(report(error, 'listenActivity/events/removed'))
    })


    // BILLS

    const billsRef = tribeRef.child('bills').orderByChild('added').limitToLast(FETCH_MAX)
    refs.push(billsRef)

    const billsCallback = (type, snapshot) => {
      const value = snapshot.val()

      if (value.added < now - (DAYS_NEW * ONE_DAY)) {
        return // ignore bills added more than a week ago
      }

      const row = {
        id: snapshot.key,
        name: value.name,
        added: value.added,
        part: value.parts[uid],
      }

      dispatch({
        type,
        in: 'bills',
        row,
      })
    }

    billsRef.on('child_added', billsCallback.bind(null, ACTIVITY_ADDED), (error) => {
      dispatch(report(error, 'listenActivity/bills/added'))
    })
    billsRef.on('child_changed', billsCallback.bind(null, ACTIVITY_CHANGED), (error) => {
      dispatch(report(error, 'listenActivity/bills/changed'))
    })
    billsRef.on('child_removed', billsCallback.bind(null, ACTIVITY_REMOVED), (error) => {
      dispatch(report(error, 'listenActivity/bills/removed'))
    })


    // NOTES

    const notesRef = tribeRef.child('notes')
    refs.push(notesRef)

    notesRef.on('value', (snapshot) => {
      const values = snapshot.val()
      const notes = []
      for (const key in values) {
        const note = values[key]
        const text = oneLine(note.title) || oneLine(note.content)

        if (text && note.updated > (now - (DAYS_NEW * ONE_DAY))) {
          notes.push({
            id: key,
            name: text,
            updated: note.updated,
            author: note.author,
          })
        }
      }
      loadedOne()
      dispatch({
        type: ACTIVITY,
        data: {notes},
      })
    }, (error) => {
      dispatch(report(error, 'listenActivity/tasks'))
    })
  }
}

const off = () => {
  return (dispatch) => {
    refs.forEach((ref) => {
      ref.off()
    })
    refs = []
    dispatch({
      type: ACTIVITY_CLEAR,
    })
  }
}

export default {on, off}
