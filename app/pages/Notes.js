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

import AsyncContent from '../hoc/AsyncContent'

import Note from '../components/Note'

import styles from '../constants/styles'

import getNotes from '../actions/getNotes'
import postNote from '../actions/postNote'
import moveNote from '../actions/moveNote'
import putNotes from '../actions/putNotes'
import deleteNote from '../actions/deleteNote'

class Notes extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      note: {},
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleMoving = this.handleMoving.bind(this)
    this.handleMoved = this.handleMoved.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
  }

  componentDidMount() {
    this.autoCreate(this.props)
  }

  componentWillReceiveProps(props) {
    this.autoCreate(props)
  }

  autoCreate(props) {
    const locationState = this.props.location.state
    if (locationState && locationState.do === 'new' && !this.autoCreated && props.notes.pages > 0) {
      const lastNote = props.notes.items[0]
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
    })
  }

  handleMoving(draggedNote, hoveredNote) {
    this.props.moveNote(draggedNote, hoveredNote)
  }

  handleMoved() {
    this.props.putNotes(this.props.notes.items.map((note) => note.id))
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

    const columns = Math.min(notes.items.length, Math.floor(this.props.containerWidth / 250))

    const style = {
      columnCount: columns, WebkitColumnCount: columns, MozColumnCount: columns,
      columnGap: 0, WebkitColumnGap: 0, MozColumnGap: 0,
      padding: 8,
    }

    return (
      <AsyncContent style={style} fetcher={this.props.getNotes} data={notes}>
        {
          notes.items.map((note) =>
            <Note key={note.id}
              note={note}
              onMoving={this.handleMoving}
              onMoved={this.handleMoved}
              onDelete={this.handleDelete}
            />
          )
        }

        <Dialog title={<FormattedMessage id="delete_title" values={{type: 'note'}} />}
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDelete}
        >
          <FormattedMessage id="delete_body" values={{type: 'note', name: this.state.note.title}} />
        </Dialog>

        <FloatingActionButton style={styles.fab} onTouchTap={this.handleCreate}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Notes.propTypes = {
  // from react-router:
  location: PropTypes.object.isRequired,
  // redux state:
  notes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  containerWidth: PropTypes.number.isRequired,
  // action creators:
  getNotes: PropTypes.func.isRequired,
  postNote: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  putNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  containerWidth: (state.app.width > 800 ? state.app.width - 256 : state.app.width),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNotes,
  postNote,
  moveNote,
  putNotes,
  deleteNote,
}, dispatch)

export default compose(
  dragDropContext(html5backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Notes)
