import React from 'react';
import Dropzone from 'react-dropzone';
import storeFolder from './store/FolderStore';


export default class extends React.Component {
    constructor() {
      super();
      this.state = {folder:'No folder selected'};
      this.detail = this.detail.bind(this);
      var activeFolderId = $('#active-folder').val();
      if(activeFolderId > 0){
        storeFolder.get(activeFolderId);
      }
    }


    componentWillMount(){
      storeFolder.on('singleFolder', this.detail);
    }

    componentWillUnmount(){
      storeFolder.removeListener('singleFolder', this.detail);
    }

    detail(result){
      if(result.status == 200){
        this.setState({folder: result.data.name});
      }
    }

    onDrop(files) {
      console.log('Received files: ', files);
      var folder_id = $('#active-folder').val();
      console.log(folder_id);
    }

    render() {
        return (
         <div class="col-md-12 upload">
         <p>Upload folder: <small> {this.state.folder} </small></p>
            <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
              <div>Drag and drop an image here, or click to select image to upload.</div>
            </Dropzone>
          </div>
        );
    }
}
