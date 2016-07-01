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


    render() {
        return (
         <div class="col-md-12">
            <h3>no photo found</h3>

         </div>
        );
    }
}
