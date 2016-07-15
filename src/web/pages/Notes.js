import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {FormattedMessage} from 'react-intl'
import {DragDropContext as dragDropContext} from 'react-dnd'
import html5backend from 'react-dnd-html5-backend'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import Note from '../components/Note'

import styles from '../styles'

import getNotes from '../../common/actions/getNotes'
import postNote from '../../common/actions/postNote'
import moveNote from '../../common/actions/moveNote'
import putNotes from '../../common/actions/putNotes'
import deleteNote from '../../common/actions/deleteNote'

import {MENU_WIDTH} from '../../common/constants/product'

class Notes extends Component {
  static propTypes = {
    // from react-router:
    location: PropTypes.object.isRequired,
    // redux state:
    tid: PropTypes.string,
    notes: PropTypes.array.isRequired,
    containerWidth: PropTypes.number.isRequired,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    postNote: PropTypes.func.isRequired,
    moveNote: PropTypes.func.isRequired,
    putNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      note: {},
    }
    this.load = this.load.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleMoving = this.handleMoving.bind(this)
    this.handleMoved = this.handleMoved.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
  }

  componentDidMount() {
    this.load(this.props.tid)
    this.autoCreate(this.props)
  }

  componentWillReceiveProps(props) {
    this.load(props.tid)
    this.autoCreate(props)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  load(tid) {
    if (tid && this.tid !== tid) {
      this.tid = tid
      this.props.subscribe()
    }
  }

  autoCreate(props) {
    const locationState = this.props.location.state
    if (locationState && locationState.do === 'new' && !this.autoCreated) {
      const lastNote = props.notes[0]
      if (!lastNote || lastNote.title || lastNote.content) {
        // no note, or the last one is not empty
        this.props.postNote({
          title: '',
          content: '',
        })
        this.autoCreated = true
      }
    }
  }

  handleCreate() {
    this.props.postNote({
      title: '',
      content: '',
      position: this.props.notes.length ? this.props.notes[0].position - 1 : 0,
    })
  }

  handleMoving(draggedNote, hoveredNote) {
    this.props.moveNote({
      draggedNote,
      hoveredNote,
    })
  }

  handleMoved() {
    this.props.putNotes()
  }

  handleDelete(note, unsaved) {
    if (!unsaved && !note.title && !note.content) {
      // skip confirmation
      this.props.deleteNote(note.id)
    } else {
      this.setState({
        openDialog: true,
        note,
      })
    }
  }

  handleConfirmDelete() {
    this.props.deleteNote(this.state.note.id)
    this.handleCloseDelete()
  }

  handleCloseDelete() {
    this.setState({
      openDialog: false,
    })
  }

  renderNote(row) {
    return (
      <Note key={row.id}
        note={row}
        onMoving={this.handleMoving}
        onMoved={this.handleMoved}
        onDelete={this.handleDelete}
      />
    )
  }

  render() {
    const {notes} = this.props

    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDelete}
      />,
      <FlatButton
        label={<FormattedMessage id="delete" />}
        primary={true}
        onTouchTap={this.handleConfirmDelete}
      />,
    ]

    const columns = Math.min(notes.length, Math.floor(this.props.containerWidth / 250))

    const style = {
      columnCount: columns, WebkitColumnCount: columns, MozColumnCount: columns,
      columnGap: 0, WebkitColumnGap: 0, MozColumnGap: 0,
      padding: 8,
    }

    return (
      <div style={style}>
        {
          notes.map((note) =>
            <Note key={note.id}
              note={note}
              onMoving={this.handleMoving}
              onMoved={this.handleMoved}
              onDelete={this.handleDelete}
            />
          )
        }

        <Dialog title={this.state.note.title}
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDelete}
        >
          <FormattedMessage id="delete_dialog" values={{type: 'note'}} />
        </Dialog>

        <FloatingActionButton style={styles.fab} onTouchTap={this.handleCreate}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  notes: state.notes.items,
  containerWidth: (state.app.width > 800 ? state.app.width - MENU_WIDTH : state.app.width),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: getNotes.on,
  unsubscribe: getNotes.off,
  postNote,
  moveNote,
  putNotes,
  deleteNote,
}, dispatch)

export default compose(
  dragDropContext(html5backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Notes)
