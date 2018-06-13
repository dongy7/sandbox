import React, { Component } from 'react'
import Rx from 'rxjs/Rx'
import Code from './components/Code'
import compile from 'scheme2js'
import 'codemirror/mode/scheme/scheme'
import 'codemirror/mode/javascript/javascript'
import './App.css'
import 'codemirror/lib/codemirror.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '(add 1 2)',
      out: 'add(1, 2)'
    }
    this.onCodeChange$ = new Rx.Subject()
    this.onCodeChange = this.onCodeChange.bind(this)
  }

  componentDidMount() {
    // debounce on src code change to avoid invoking compiler
    // on every input change.
    this.subscription = this.onCodeChange$
      .debounceTime(300)
      .subscribe(code => this.onCompile(code))
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onCompile(src) {
    let code
    try {
      code = compile(src)
    } catch (SyntaxError) {
      // TODO: show error
      console.log('compilation failed')
      return
    }

    this.setState({
      out: code
    })
  }

  onCodeChange(code) {
    this.setState({ src: code })
    this.onCodeChange$.next(code)
  }

  render() {
    return (
      <div className="App">
        <div className="code-container">
          <div className="code">
            <Code
              value={this.state.src}
              onChange={this.onCodeChange}
              mode="scheme"
            />
          </div>
          <div className="code">
            <Code
              value={this.state.out}
              onChange={() => {}}
              readOnly
              mode="javascript"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
