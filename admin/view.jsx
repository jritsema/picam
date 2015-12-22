import React from 'react'
import request from 'browser-request'
import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import CircularProgress from 'material-ui/lib/circular-progress'

export default React.createClass({

  baseUrl: '/',

  getInitialState() {
    return {
      options: undefined,
      shooting: false,
      imageUrl: this.baseUrl + 'photo.jpg'
    };
  },

  componentDidMount() {
    request({ url: this.baseUrl + 'camera', json: true }, function(err, res, body) {
      if (err) throw err;
      this.setState({ options: body });
    }.bind(this));
  },

  onTakePicture(event) {

    //update ui to shooting state
    this.setState({ shooting: true });

    //call backend api and then update shooting state when complete
    //tack on a unique value to the image url to bust the cache
    var uri = this.baseUrl + 'photo';
    var input = { cliArgs: this.state.options.cliArgs };
    request({ method: 'POST', url: uri, json: input }, function (err, res) {
      if (err) { console.log('error posting photo'); alert(err); }
      this.setState({
        shooting: false,
        imageUrl: this.state.imageUrl + '?' + Date.now()
      });
    }.bind(this));
  },

  render() {
    var content = (
      <div>
        <br/>
        <CircularProgress mode="indeterminate" />
      </div>
    );
    if (!this.state.shooting && this.state.options) {
      content = (
        <div>
          <TextField
            hintText="raspistill options"
            floatingLabelText="raspistill options"
            defaultValue={this.state.options.cliArgs}
          />
          <br/><br/>
          <RaisedButton
            label="Take Picture"
            primary={true}
            onMouseUp={this.onTakePicture}
          />
          <br/><br/>
          <img src={this.state.imageUrl} />
        </div>
      );
    }
    return (
      <div>
        <AppBar title={<span>picam</span>} />
        {content}
      </div>
    );
  }
});
