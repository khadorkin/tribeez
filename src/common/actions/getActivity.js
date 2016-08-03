import {db, auth} from '../firebase'

import {
  ACTIVITY,
  ACTIVITY_ADDED,
  ACTIVITY_CHANGED,
  ACTIVITY_REMOVED,
} from '../constants/actions'

import {firebaseError} from './error'

const FETCH_MAX = 10
const DAYS_NEW = 7 // number of days an item remains considerd "new"

const ONE_DAY = 86400000 // one day = 24 x 60 x 60 x 1000 ms

const on = (tid) => {
  return (dispatch) => {
    const uid = auth.currentUser.uid
    const now = Date.now()

    const tribeRef = db.ref('tribes/' + tid)


    // POLLS

    const pollsRef = tribeRef.child('polls')

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
            description: poll.description,
          })
        }
      }
      dispatch({
        type: ACTIVITY,
        data: {polls},
      })
    }, (error) => {
      dispatch(firebaseError(error, 'getActivity/polls'))
    })


    // TASKS

    const tasksRef = tribeRef.child('tasks')

    tasksRef.on('value', (snapshot) => {
      const values = snapshot.val()
      const tasks = []
      for (const key in values) {
        const task = values[key]

        if (task.done) {
          const elapsed = (now - task.done) / ONE_DAY // days
          if (elapsed < task.wait) {
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
          added: task.added,
          author: task.author,
          description: task.description,
          done: task.done,
        })
      }
      dispatch({
        type: ACTIVITY,
        data: {tasks},
      })
    }, (error) => {
      dispatch(firebaseError(error, 'getActivity/tasks'))
    })


    // EVENTS

    const oneHourAgo = now - 3600000

    const eventsRef = tribeRef.child('events').orderByChild('index').startAt(oneHourAgo).limitToLast(FETCH_MAX)

    const eventsCallback = (type, snapshot) => {
      const value = snapshot.val()

      const row = {
        id: snapshot.key,
        name: value.name,
        added: value.added,
        author: value.author,
        description: value.description,
      }

      dispatch({
        type,
        in: 'events',
        row,
      })
    }

    eventsRef.on('child_added', eventsCallback.bind(null, ACTIVITY_ADDED), (error) => {
      dispatch(firebaseError(error, 'getActivity/events/added'))
    })
    eventsRef.on('child_changed', eventsCallback.bind(null, ACTIVITY_CHANGED), (error) => {
      dispatch(firebaseError(error, 'getActivity/events/changed'))
    })
    eventsRef.on('child_removed', eventsCallback.bind(null, ACTIVITY_REMOVED), (error) => {
      dispatch(firebaseError(error, 'getActivity/events/removed'))
    })


    // BILLS

    const billsRef = tribeRef.child('bills').orderByChild('added').limitToLast(FETCH_MAX)

    const billsCallback = (type, snapshot) => {
      const value = snapshot.val()

      if (value.added < now - (DAYS_NEW * ONE_DAY)) {
        return // ignore bills added more than a week ago
      }

      const row = {
        id: snapshot.key,
        name: value.name,
        added: value.added,
        author: value.author,
        payer: value.payer,
        description: value.description,
        amount: value.amount,
        part: value.parts[uid],
      }

      dispatch({
        type,
        in: 'bills',
        row,
      })
    }

    billsRef.on('child_added', billsCallback.bind(null, ACTIVITY_ADDED), (error) => {
      dispatch(firebaseError(error, 'getActivity/bills/added'))
    })
    billsRef.on('child_changed', billsCallback.bind(null, ACTIVITY_CHANGED), (error) => {
      dispatch(firebaseError(error, 'getActivity/bills/changed'))
    })
    billsRef.on('child_removed', billsCallback.bind(null, ACTIVITY_REMOVED), (error) => {
      dispatch(firebaseError(error, 'getActivity/bills/removed'))
    })


    // NOTES

    const notesRef = tribeRef.child('notes')

    notesRef.on('value', (snapshot) => {
      const values = snapshot.val()
      const notes = []
      for (const key in values) {
        const note = values[key]

        if (note.updated > now - (DAYS_NEW * ONE_DAY)) {
          notes.push({
            id: key,
            name: note.title,
            added: note.updated,
            author: note.author,
          })
        }
      }
      dispatch({
        type: ACTIVITY,
        data: {notes},
      })
    }, (error) => {
      dispatch(firebaseError(error, 'getActivity/tasks'))
    })
  }
}

const off = () => {
  return () => {
    //TODO
  }
}

export default {on, off}
