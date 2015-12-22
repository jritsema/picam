import React from 'react'
import ReactDOM from 'react-dom'
import View from './view.jsx'

var App = React.createClass({
  render: function() {
    return <View />
  }
});

ReactDOM.render(<App />, document.querySelector('#content'))
