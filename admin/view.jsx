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
      loading: true,
      shooting: false,
      options: undefined,
      imageUrl: this.baseUrl + 'photo.jpg'
    };
  },

  componentDidMount() {
    request({ url: this.baseUrl + 'camera', json: true }, (err, res, body) => {
      if (err) throw err;
      this.setState({
        loading: false,
        options: body
      });
    }.bind(this));
  },

  onTakePicture(event) {

    //update ui to shooting state
    this.setState({ shooting: true });

    //call backend api and then update shooting state when complete
    //tack on a unique value to the image url to bust the cache
    var uri = this.baseUrl + 'photo';
    var input = { cliArgs: this.state.options.cliArgs };
    request({ method: 'POST', url: uri, json: input }, (err, res) => {
      if (err) { console.log('error posting photo'); alert(err); }
      this.setState({
        shooting: false,
        imageUrl: this.state.imageUrl + '?' + Date.now()
      });
    }.bind(this));
  },

  render() {

    //3 states:
    //- loading (spinner only)
    //- normal (everything)
    //- shooting (replace photo with spinner)

    let spinner = (
      <div>
        <br/>
        <CircularProgress mode="indeterminate" />
      </div>
    );

    let photo = (
      <div>
        <br/>
        <img src={this.state.imageUrl} />
      </div>
    );

    let buttonText = this.state.shooting ? 'Taking Picture...' : 'Take Picture';

    let options = this.state.options ? this.state.options.cliArgs : '';

    let bottomPane = this.state.shooting ? spinner : photo;

    let content = (
      <div>
        <TextField
          hintText="raspistill options"
          floatingLabelText="raspistill options"
          defaultValue={options}
        />
        <br/><br/>
        <RaisedButton
          label={buttonText}
          primary={true}
          onMouseUp={this.onTakePicture}
        />
        <br/>
        {bottomPane}
      </div>
    );

    //only show spinner if we're loading
    if (this.state.loading)
      content = spinner;

    //render AppBar with content
    return (
      <div>
        <AppBar title={<span>picam</span>} />
        {content}
      </div>
    );
  }
});
