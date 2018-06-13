import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

export default class Code extends React.Component {
  render() {
    const options = {
      lineNumbers: true,
      readOnly: this.props.readOnly,
      mode: this.props.mode
    }
    return (
      <CodeMirror
        value={this.props.value}
        options={options}
        onChange={(editor, data, val) => {
          this.props.onChange(val)
        }}
      />
    )
  }
}
