import React from 'react';
import Loader from 'react-loader';
import Options from '../components/Options';
import * as action from './actions/GenericAction';
import FolderThumb from './FolderThumb';
import store from './store/FolderStore';
import Pagination from './Pagination';

export default class extends React.Component {
    constructor() {
      super();
      this.state = {
        loaded:false,
        folders:[]
      }
    }

    componentWillMount(){
      store.on('listFolder', this.complete.bind(this));
      store.getAll();
    }

    componentWillUnmount(){
      store.removeListener('listFolder', this.complete.bind(this));
    }

    complete(data){
      console.log(data)
      this.setState({
        folders: data.data,
        loaded: true
      })
    }

    render() {
        const folders = this.state.folders.map((item) => { return <FolderThumb key={item.id} {...item} /> });
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
