import React from 'react';
import Loader from 'react-loader';
import Options from '../components/Options';
import * as action from './actions/GenericAction';
import FolderThumb from './FolderThumb';
import Empty from './Empty';
import store from './store/FolderStore';
import Pagination from './Pagination';

export default class extends React.Component {
    constructor() {
      super();
      this.state = {
        loaded:false,
        folders:[]
      }
      this.complete = this.complete.bind(this);
    }

    componentWillMount(){
      store.on('listFolder', this.complete);
      store.getAll();
    }

    componentWillUnmount(){
      store.removeListener('listFolder', this.complete);
    }

    complete(data){
      this.setState({
        folders: data.data,
        loaded: true
      })
    }

    render() {
        const folders = this.state.folders.map((item) => { return <FolderThumb key={item.id} {...item} /> });
        if(!folders.length){
          return (
            <Empty title="No folder found" />
          )
        }
        return (
         <div class="row">
         <div class="col-md-12">
          <Loader loaded={this.state.loaded} top="75%" />
          {folders}
          </div>
          <div class="col-md-12">
            <Pagination />
          </div>
         </div>
        );
    }
}
