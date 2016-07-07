import React from 'react';
import Dropzone from 'react-dropzone';
import storeFolder from './store/FolderStore';
import storePhoto from './store/PhotoStore';
import * as action from './actions/GenericAction';
import Loader from 'react-loader';
import * as Toast from './actions/ToastAction';


export default class extends React.Component {
    constructor() {
      super();
      this.detail = this.detail.bind(this);
      this.uploadComplete = this.uploadComplete.bind(this);
      this.onDrop = this.onDrop.bind(this);
      var activeFolderId = $('#active-folder').val();
      if(activeFolderId > 0){
        storeFolder.get(activeFolderId);
      }
    }

    componentWillMount(){
      this.state = {folder:'No folder selected', loaded: true};
      storeFolder.on('singleFolder', this.detail);
      storePhoto.on('newPhoto', this.uploadComplete);
    }

    componentWillUnmount(){
      storeFolder.removeListener('singleFolder', this.detail);
      storePhoto.removeListener('newPhoto', this.uploadComplete);
    }

    detail(result){
      if(result.status == 200){
        this.setState({folder: result.data.name});
      }
    }

    uploadComplete(result){
      this.setState({loaded:true});
      if(result.status == 201){
        Toast.ok('Upload successful');
        document.location.href="#/editimage/" + result.data.id;
      }else{
        Toast.error('Unable to complete upload');
      }

    }

    onDrop(files) {
      this.setState({loaded: false});
      var folder_id = $('#active-folder').val();
      var formData = new FormData();
      formData.append('folder_id', folder_id);
      formData.append('image', files[0]);
      storePhoto.create(formData);
    }

    render() {
        return (
          <div>
              <Loader loaded={this.state.loaded} top="73%" />
             <div class="col-md-12 upload">
              <p>Upload folder: <small> {this.state.folder} </small></p>
              <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
                <div>Drag and drop an image here, or click to select image to upload.</div>
              </Dropzone>
            </div>
          </div>

        );
    }
}
