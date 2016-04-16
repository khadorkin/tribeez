import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {Editor, EditorState, ContentState} from 'draft-js'
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import CloudQueue from 'material-ui/svg-icons/file/cloud-queue'
import CloudDone from 'material-ui/svg-icons/file/cloud-done'
import DeleteButton from 'material-ui/svg-icons/action/delete'
import * as colors from 'material-ui/styles/colors'

import putNote from '../actions/putNote'

class Note extends Component {

  constructor(props) {
    super(props)
    const titleContentState = ContentState.createFromText(this.props.note.title)
    const contentContentState = ContentState.createFromText(this.props.note.content)
    this.state = {
      titleEditorState: EditorState.createWithContent(titleContentState),
      contentEditorState: EditorState.createWithContent(contentContentState),
      unsaved: false,
    }
    this.save = this.save.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    if (!this.props.note.title) {
      this.refs.title.focus()
    }
  }

  componentWillReceiveProps(props) {
    if (props.note.saved) {
      this.setState({
        unsaved: false,
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
    if (this.state.unsaved) {
      this.save()
    }
  }

  save() {
    const title = this.state.titleEditorState.getCurrentContent().getPlainText()
    const content = this.state.contentEditorState.getCurrentContent().getPlainText()
    this.props.putNote({
      ...this.props.note,
      title,
      content,
    })
  }

  handleTitleChange(titleEditorState) {
    const title = this.state.titleEditorState.getCurrentContent().getPlainText()
    this.setState({
      titleEditorState,
    })
    if (this.props.note.title !== title) {
      if (!this.state.unsaved) {
        this.setState({
          unsaved: true,
        })
      }
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.save, 2000)
    }
  }

  handleContentChange(contentEditorState) {
    const content = this.state.contentEditorState.getCurrentContent().getPlainText()
    this.setState({
      contentEditorState,
    })
    if (this.props.note.content !== content) {
      if (!this.state.unsaved) {
        this.setState({
          unsaved: true,
        })
      }
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.save, 2000)
    }
  }

  handleDelete() {
    this.props.onDelete(this.props.note)
  }

  preventDrop() {
    return true // disable drag & drops to prevent conflict with react-dnd
  }

  render() {
    const {connectDragSource, connectDropTarget, isDragging} = this.props

    const titleEditor = (
      <Editor ref="title"
        placeholder="Title"
        editorState={this.state.titleEditorState}
        onChange={this.handleTitleChange}
        handleDrop={this.preventDrop}
      />
    )
    const textEditor = (
      <Editor ref="content"
        editorState={this.state.contentEditorState}
        onChange={this.handleContentChange}
        handleDrop={this.preventDrop}
      />
    )

    return connectDragSource(connectDropTarget(
      <div style={{opacity: (isDragging ? 0 : 1), display: 'inline-block', width: '100%'}}>
        <Card style={{margin: 8, overflow: 'visible'}}>
          <CardTitle title={titleEditor} />
          <CardText>
            {textEditor}
          </CardText>
          <CardActions style={{textAlign: 'right', cursor: 'move'}}>
            {this.state.unsaved ? <CloudQueue color={colors.grey600} /> : <CloudDone color={colors.grey600} />}
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
  onMoving: PropTypes.func.isRequired,
  onMoved: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  // action creators:
  putNote: PropTypes.func.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putNote,
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

const cardTarget = {
  hover(props, monitor) {
    const draggedNote = monitor.getItem().note
    const hoveredNote = props.note

    if (monitor.isOver({shallow: true})) {
      return
    }

    if (draggedNote.id === hoveredNote.id) {
      // hovering itself
      return
    }

    props.onMoving(draggedNote, hoveredNote)
  },
  drop(props) {
    props.onMoved()
  },
}

const dropConnect = (conn) => ({
  connectDropTarget: conn.dropTarget(),
})

export default compose(
  dragSource('Note', cardSource, dragCollect),
  dropTarget('Note', cardTarget, dropConnect),
  connect(null, mapDispatchToProps)
)(Note)
