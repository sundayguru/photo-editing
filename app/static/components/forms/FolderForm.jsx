import React from 'react';
import Loader from 'react-loader';
import * as action from '../actions/GenericAction';
import * as Toast from '../actions/ToastAction';
import store from '../store/FolderStore';

export default class extends React.Component {
    constructor(){
      super();
      this.detail = this.detail.bind(this);
      this.complete = this.complete.bind(this);
    }

    componentWillMount(){
      this.state = {loaded: true};
      store.on('newFolder', this.complete);
      store.on('singleFolder', this.detail);
    }

    componentWillUnmount(){
      store.removeListener('newFolder', this.complete);
      store.removeListener('singleFolder', this.complete);
    }

    complete(data){
      this.setState({loaded:true});
      if(data.status == 201){
        Toast.ok('New folder created');
        $('#formModal').modal('toggle');
        store.getAll();
      }else if(data.status == 200){
        Toast.ok('Folder updated');
        $('#formModal').modal('toggle');
         store.getAll();
      } else {
        Toast.error('Unable to complete request');
      }
      document.location.href = '#/';
    }

    detail(data){
      if(data.status == 200){
        $('#folder_name').val(data.data.name);
        $('#folder_id').val(data.data.id);
      }

    }

    onSubmit(e){
      e.preventDefault();
      var dataArray = $(e.target).serializeArray();
      var form = new FormData();
      dataArray.forEach(function(data){
          form.append(data.name, data.value);
      });
      var id = $('#folder_id').val();
      if(id){
         form.append('id', id);
      }

      this.setState({loaded:false});
      var actionType = id ? 'UPDATE_FOLDER' :  'NEW_FOLDER';
      action.perform(form, actionType);
    }

    render() {

        return (
          <div class="row">
            <form class="form-horizontal" method="post" onSubmit={ this.onSubmit.bind(this) } >
            <Loader loaded={this.state.loaded} top="73%" />
              <fieldset>
                <div class="form-group col-md-10">
                  <label class="control-label">Folder Name</label>
                  <div class="input-group">
                    <input type="text" class="form-control" id="folder_name" name="name" required />
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="submit" disabled={!this.state.loaded}>Save</button>
                    </span>
                  </div>
                </div>
              </fieldset>
            </form>
            <input type="hidden" class="form-control" id="folder_id" name="folder_id" />
          </div>
        );
    }
}
