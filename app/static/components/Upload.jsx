import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class extends React.Component {
    constructor() {
      super();
      this.style = {width:"50%"};
    }

    onDrop(files) {
      console.log('Received files: ', files);
      request.post('/photos/upload/')
      .attach(files[0].name, files[0])
      .end(function(err, result){
        console.log(err, result);
      });
    }

    render() {
        return (
         <div class="col-md-12 upload">
            <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
              <div>Drag and drop an image here, or click to select image to upload.</div>
            </Dropzone>
          </div>
        );
    }
}
