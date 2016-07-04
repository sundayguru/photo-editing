import React from 'react';
import Loader from 'react-loader';
import * as action from './actions/GenericAction';
import * as Toast from './actions/ToastAction';
import store from './store/FolderStore';


export default class extends React.Component {

    constructor(){
      super();
      this.detail = this.detail.bind(this);
      this.complete = this.complete.bind(this);
    }

    componentWillMount(){
      this.state = {
        loaded: true,
        id:this.props.params.id
      };

      if(this.props.params.id){
        store.get(this.props.params.id)
      }

      store.on('newFolder', this.complete);
      store.on('singleFolder', this.detail);
    }

    componentWillUnmount(){
      store.removeListener('newFolder', this.complete);
    }

    complete(data){
      this.setState({loaded:true});
      if(data.status == 201){
        Toast.ok('New folder created');
        document.location.href = '#/';
      }else if(data.status == 200){
        Toast.ok('Folder updated');
        document.location.href = '#/';
      }else{
        Toast.error('Unable to complete request');
      }
    }

    detail(data){
      if(data.status == 200){
        $('#name').val(data.data.name);
      }

    }

    onSubmit(e){
      e.preventDefault();
      var dataArray = $(e.target).serializeArray();
      var form = new FormData();
      dataArray.forEach(function(data){
          form.append(data.name, data.value);
      });

      if(this.props.params.id){
         form.append('id', this.props.params.id);
      }

      this.setState({loaded:false});
      var actionType = this.props.params.id ?  'UPDATE_FOLDER' :  'NEW_FOLDER';
      action.perform(form, actionType);
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
