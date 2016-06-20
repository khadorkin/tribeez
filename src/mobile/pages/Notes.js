import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import SortableListView from 'react-native-sortable-listview'

//import AsyncContent from '../hoc/AsyncContent'
import Note from '../components/Note'
import Fab from '../components/Fab'

import getNotes from '../../common/actions/getNotes'
import postNote from '../../common/actions/postNote'
import moveNote from '../../common/actions/moveNote'

class Notes extends Component {
  static propTypes = {
    // redux state:
    notes: PropTypes.object.isRequired,
    // action creators:
    getNotes: PropTypes.func.isRequired,
    postNote: PropTypes.func.isRequired,
    moveNote: PropTypes.func.isRequired,
    // putNotes: PropTypes.func.isRequired, //TODO
  }

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.handleFab = this.handleFab.bind(this)
    this.ref = this.ref.bind(this)
    this.handleMove = this.handleMove.bind(this)
  }

  componentDidMount() {
    this.props.getNotes()
  }

  ref(el) {
    this.el = el
  }

  handleFab() {
    this.props.postNote({
      title: '',
      content: '',
    })
  }

  handleMove(event) {
    this.props.moveNote({
      draggedNote: event.row.data,
      from: event.from,
      to: event.to,
    })
    this.el.forceUpdate()
  }

  renderRow(row) {
    return <Note item={row} />
  }

  render() {
    const {notes} = this.props

    return (
      <View style={styles.container}>
        <SortableListView
          ref={this.ref}
          style={styles.list}
          data={notes.items}
          renderRow={this.renderRow}
          onRowMoved={this.handleMove}
        />
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getNotes,
  postNote,
  moveNote,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    //TODO: add 4px at the begining
    //TODO: add space at the end for FAB
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
