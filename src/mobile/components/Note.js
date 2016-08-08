import React, {Component, PropTypes} from 'react'
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TextArea from './TextArea'
import IconButton from './IconButton'

import putNote from '../../common/actions/putNote'
import deleteNote from '../../common/actions/deleteNote'

import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'

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
    this.timeoutId = setTimeout(this.save, 2000)
  }

  handleContentChange(content) {
    this.setState({
      content,
      unsaved: true,
    })
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(this.save, 2000)
  }

  handleDelete() {
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
            placeholder="title" //TODO: translate
            underlineColorAndroid="transparent"
            value={this.state.title}
            style={styles.title}
            minHeight={47}
            onChangeText={this.handleTitleChange}
            id={this.props.note.id} // to refresh TextArea height when drag&dropping
          />
          <TextArea
            underlineColorAndroid="transparent"
            value={this.state.content}
            style={styles.content}
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
  },
  content: {
    color: colors.primaryText,
    marginVertical: 12,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putNote,
  deleteNote,
}, dispatch)

export default connect(null, mapDispatchToProps)(Note)
