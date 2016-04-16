import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
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
    this.handleMove = this.handleMove.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleCreate() {
    this.props.postNote({
      title: '',
      content: '',
    })
  }

  handleMove(draggedNote, hoveredNote) {
    this.props.moveNote(draggedNote, hoveredNote)
  }

  handleSave() {
    this.props.putNotes(this.props.notes.items.map((note) => note.id))
  }

  handleDialogOpen(note) {
    this.setState({
      openDialog: true,
      note,
    })
  }

  handleDelete() {
    this.props.deleteNote(this.state.note.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const {notes} = this.props

    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ]

    const columns = Math.floor(this.props.containerWidth / 250)

    const style = {
      columnCount: columns, WebkitColumnCount: columns, MozColumnCount: columns,
      columnGap: 0, WebkitColumnGap: 0, MozColumnGap: 0,
      padding: 8,
    }

    return (
      <AsyncContent style={style} fetcher={this.props.getNotes} data={notes}>
        {
          notes.items.map((note) =>
            <Note note={note} key={note.id} onMove={this.handleMove} onSave={this.handleSave} onDelete={this.handleDialogOpen} />
          )
        }

        <Dialog title="Delete note"
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}
        >
          Delete the note "{this.state.note.title}"?
        </Dialog>

        <FloatingActionButton style={styles.fab} onTouchTap={this.handleCreate}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Notes.propTypes = {
  // redux state:
  notes: PropTypes.object.isRequired,
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
