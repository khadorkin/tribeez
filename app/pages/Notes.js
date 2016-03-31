import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'
import {DragDropContext as dragDropContext} from 'react-dnd'
import html5backend from 'react-dnd-html5-backend'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import AsyncContent from '../hoc/AsyncContent'

import Note from '../components/Note'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getNotes from '../actions/getNotes'
import moveNote from '../actions/moveNote'
import putNotes from '../actions/putNotes'

class Notes extends Component {

  constructor(props) {
    super(props)
    this.handleLoad = this.handleLoad.bind(this)
    this.handleMove = this.handleMove.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleLoad() {
    if (!this.props.notes.got) {
      this.props.getNotes()
    }
  }

  handleMove(draggedNote, hoveredNote) {
    this.props.moveNote(draggedNote, hoveredNote)
  }

  handleSave() {
    this.props.putNotes(this.props.notes.list.map((note) => note.id))
  }

  render() {
    const {notes} = this.props

    const style = {display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start', padding: 10}

    return (
      <AsyncContent style={style} onLoad={this.handleLoad} error={notes.error}>
        {
          notes.list.map((note) =>
            <Note note={note} key={note.id} onMove={this.handleMove} onSave={this.handleSave} />
          )
        }

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.NOTES_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Notes.propTypes = {
  notes: PropTypes.object.isRequired,
  getNotes: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  putNotes: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  notes: state.notes,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNotes,
  moveNote,
  putNotes,
}, dispatch)

export default compose(
  dragDropContext(html5backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Notes)
