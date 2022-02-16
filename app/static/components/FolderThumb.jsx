import React from 'react';
import Loader from 'react-loader';
import Options from './Options';
import store from './store/FolderStore';
import * as Toast from './actions/ToastAction';


export default class extends React.Component {
  constructor(){
    super();
    this.deleteComplete = this.deleteComplete.bind(this);
  }

  deleteFolder(e){
    e.preventDefault();
    this.setState({loaded: false});
    store.delete(this.id);
  }

  componentWillMount(){
    this.state = {
      loaded: true
    };
    store.on('deleteFolder', this.deleteComplete);
  }

  componentWillUnmount(){
    store.removeListener('deleteFolder', this.deleteComplete);
  }

  deleteComplete(data){
    this.setState({loaded:true});
    if(data.status == 204){
      Toast.ok('Folder deleted');
      store.getAll();
    }else{
      Toast.error('Unable to complete request');
    }
  }

  render() {
      var {name, id, photos, pageNum} = this.props;
      this.id = id;
      return (
         <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Loader loaded={this.state.loaded} />
            <Options editLink={ "editfolder/" + id } deleteMethod={this.deleteFolder.bind(this)} id={id} />
            <a href={"#/folder/" + id }><img src="../static/images/icons/folder.png"  /></a>
              <div class="caption">
                <h5>{name} <span class="badge right">{photos.length}</span></h5>
              </div>
            </div>
          </div>
      );
  }
}
