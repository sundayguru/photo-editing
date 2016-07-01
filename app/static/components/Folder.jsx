import React from 'react';
import Loader from 'react-loader';
import * as action from './actions/GenericAction';
import * as Toast from './actions/ToastAction';
import store from './store/FolderStore';


export default class extends React.Component {
    constructor() {
      super();
      this.state = {loaded:true};
    }

    componentWillMount(){
      store.on('newFolder', this.complete.bind(this));
    }

    componentWillUnmount(){
      store.removeListener('newFolder', this.complete.bind(this));
    }

    complete(data){
      this.setState({loaded:true});
      if(data.status == 201){
        Toast.ok('New folder created');
        document.location.href = '#/folder/'+data.data.id;
      }else{
        Toast.error('Unable to create folder');
      }
    }

    onSubmit(e){
      e.preventDefault();
      var dataArray = $(e.target).serializeArray();
      var form = new FormData();
      dataArray.forEach(function(data){
          form.append(data.name, data.value);
      });
      this.setState({loaded:false});
      action.perform(form, 'NEW_FOLDER');
    }

    render() {
        return (
         <div class="col-md-12">
            <h3>New Folder</h3>
            <form class="form-horizontal" method="post" onSubmit={ this.onSubmit.bind(this) } >
            <Loader loaded={this.state.loaded} top="73%" />
              <fieldset>
                <div class="form-group col-md-6">
                  <label class="control-label">Folder Name</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="name" name="name" required />
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="submit" disabled={!this.state.loaded}>Save</button>
                    </span>
                  </div>
                </div>
              </fieldset>
            </form>
         </div>
        );
    }
}
