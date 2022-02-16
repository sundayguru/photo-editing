import React from 'react';
import FolderInfo from './FolderInfo';
import PhotoInfo from './PhotoInfo';
import Modal from './Modal';
import storeFolder from './store/FolderStore';
import storePhoto from './store/PhotoStore';

export default class extends React.Component {
    constructor() {
      super();
      this.folderDetail = this.folderDetail.bind(this)
      this.photoDetail = this.photoDetail.bind(this)
    }

    folderDetail(data){
      this.infoElement = <FolderInfo data={data.data} />;
      this.setState({title: data.data.name});
    }

    photoDetail(data){
      this.infoElement = <PhotoInfo data={data.data} />;
      this.setState({title: data.data.folder_name + ' - ' + data.data.title});
    }

    componentWillMount(){
      this.state = {title:''};
      storeFolder.on('singleFolder', this.folderDetail);
      storePhoto.on('photo', this.photoDetail);
    }

    componentWillUnmount(){
      storeFolder.removeListener('singleFolder', this.folderDetail);
      storePhoto.removeListener('singlePhoto', this.photoDetail);
    }

    render() {
        return (
          <Modal title={this.state.title} bodyContent={ this.infoElement } id={"myModal"} />
        );
    }
}
