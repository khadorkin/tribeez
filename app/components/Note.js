import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {FormattedMessage, FormattedRelative, FormattedNumber} from 'react-intl'
import {Editor, EditorState, ContentState} from 'draft-js'
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import IconButton from 'material-ui/lib/icon-button'
import SaveButton from 'material-ui/lib/svg-icons/content/save'
import DeleteButton from 'material-ui/lib/svg-icons/action/delete'
import * as colors from 'material-ui/lib/styles/colors'

import gravatar from '../utils/gravatar'

import css from './Entry.css'

import putNote from '../actions/putNote'
import deleteNote from '../actions/deleteNote'

class Note extends Component {

  constructor(props) {
    super(props)
    const titleContentState = ContentState.createFromText(this.props.note.title)
    const textContentState = ContentState.createFromText(this.props.note.content)
    this.state = {
      titleEditorState: EditorState.createWithContent(titleContentState),
      textEditorState: EditorState.createWithContent(textContentState),
      touched: false,
    }
    this.handleTitleChange = (titleEditorState) => this.setState({titleEditorState, touched: true})
    this.handleTextChange = (textEditorState) => this.setState({textEditorState, touched: true})
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSave() {
    const title = this.state.titleEditorState.getCurrentContent().getPlainText()
    const content = this.state.textEditorState.getCurrentContent().getPlainText()
    const note = {
      ...this.props.note,
      title,
      content,
    }
    this.props.putNote(note)
  }

  handleDelete() {
    this.props.deleteNote(this.props.note.id)
  }

  render() {
    const {note, connectDragSource, connectDropTarget, isDragging} = this.props

    return connectDragSource(connectDropTarget(
      <div style={{margin: '10px', opacity: (isDragging ? 0 : 1), maxWidth: '50%'}}>
        <Card>
          <CardTitle title={<Editor editorState={this.state.titleEditorState} onChange={this.handleTitleChange} />} />
          <CardText>
            <Editor editorState={this.state.textEditorState} onChange={this.handleTextChange} />
          </CardText>
          <CardActions style={{textAlign: 'right', cursor: 'move'}}>
            <IconButton onTouchTap={this.handleSave} style={{visibility: this.state.touched ? 'visible' : 'hidden'}}>
              <SaveButton color={colors.grey600} />
            </IconButton>
            <IconButton onTouchTap={this.handleDelete}>
              <DeleteButton color={colors.red400} />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    ))
  }

}

Note.propTypes = {
  // from parent component:
  note: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // from redux state:
  uid: PropTypes.number,
  users: PropTypes.array,
  // action creators:
  putNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  width: state.app.width,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putNote,
  deleteNote,
}, dispatch)

const cardSource = {
  beginDrag(props) {
    return {
      note: props.note,
    }
  },
}

const dragCollect = (conn, monitor) => {
  return {
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

let movedNote

const cardTarget = {
  hover(props, monitor, component) {
    const draggedNote = monitor.getItem().note
    const hoveredNote = props.note

    if (monitor.isOver({shallow: true})) {
      return
    }

    if (draggedNote.id === hoveredNote.id) {
      // hovering itself
      return
    }

    props.onMove(draggedNote, hoveredNote)
  },
  drop(props, monitor, component) {
    props.onSave()
  },
}

const dropConnect = (conn) => ({
  connectDropTarget: conn.dropTarget(),
})

export default compose(
  dragSource('Note', cardSource, dragCollect),
  dropTarget('Note', cardTarget, dropConnect),
  connect(mapStateToProps, mapDispatchToProps)
)(Note)
