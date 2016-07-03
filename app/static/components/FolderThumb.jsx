import React from 'react';
import Loader from 'react-loader';
import Options from './Options';
import store from './store/FolderStore';
import * as Toast from './actions/ToastAction';


export default class extends React.Component {

  constructor(){
    super();
    this.state = {
      loaded: true
    };
    this.deleteComplete = this.deleteComplete.bind(this);
  }

  deleteFolder(){
    store.delete(this.id);
  }

  componentWillMount(){
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
      var {name, id} = this.props;
      this.id = id;
      return (
         <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options editLink={ "editfolder/" + id } deleteMethod={this.deleteFolder.bind(this)} />
            <a href={"#/folder/" + id }><img src="../static/images/icons/folder.png"  /></a>
              <div class="caption">
                <h5>{name} <span class="badge right">4</span></h5>
              </div>
            </div>
          </div>
      );
  }
}
