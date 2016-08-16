import React, {Component, PropTypes} from 'react'
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TextArea from './TextArea'
import IconButton from './IconButton'

import putNote from '../../common/actions/putNote'
import deleteNote from '../../common/actions/deleteNote'
import {alert} from '../../common/actions/app'

import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'
import {oneLine} from '../../common/utils/text'

const SAVE_DELAY = 2000

class Note extends Component {
  static propTypes = {
    // from parent:
    note: PropTypes.object.isRequired,
    // from parent via react-native-sortable-listview:
    onLongPress: PropTypes.func,
    onPressOut: PropTypes.func,
    // action creators:
    putNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    alert: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.note.title,
      content: props.note.content,
      unsaved: false,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.save = this.save.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.note.title,
      content: props.note.content,
    })
  }

  handleTitleChange(title) {
    this.setState({
      title,
      unsaved: true,
    })
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.save, SAVE_DELAY)
  }

  handleContentChange(content) {
    this.setState({
      content,
      unsaved: true,
    })
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.save, SAVE_DELAY)
  }

  handleDelete() {
    const text = oneLine(this.state.title) || oneLine(this.state.content)
    if (text) {
      this.props.alert({
        title_id: 'dialog_delete',
        text,
        buttons: [
          {text_id: 'cancel'},
          {text_id: 'delete', onPress: this.handleConfirmDelete},
        ],
      })
    } else {
      this.handleConfirmDelete()
    }
  }

  handleConfirmDelete() {
    this.props.deleteNote(this.props.note.id)
  }

  save() {
    this.props.putNote({
      ...this.props.note,
      title: this.state.title, //.trim(),
      content: this.state.content, //.trim(),
    })
    this.setState({
      unsaved: false,
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onLongPress={this.props.onLongPress} onPressOut={this.props.onPressOut}>
        <View style={styles.container}>
          <TextArea
            placeholder="title"
            value={this.state.title}
            style={styles.title}
            onChangeText={this.handleTitleChange}
            id={this.props.note.id} // to refresh TextArea height when drag&dropping
          />
          <TextArea
            placeholder="content"
            value={this.state.content}
            style={styles.content}
            minHeight={64}
            onChangeText={this.handleContentChange}
            id={this.props.note.id} // to refresh TextArea height when drag&dropping
          />
          <View style={styles.icons}>
            <IconButton name={this.state.unsaved ? 'cloud-queue' : 'cloud-done'} />
            <IconButton name="delete" onPress={this.handleDelete} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 6,
    marginBottom: 2,
    marginHorizontal: 8,
    padding: 8,
    ...elevation(1),
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    textAlignVertical: 'top',
  },
  content: {
    color: colors.primaryText,
    textAlignVertical: 'top',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putNote,
  deleteNote,
  alert,
}, dispatch)

export default connect(null, mapDispatchToProps)(Note)
