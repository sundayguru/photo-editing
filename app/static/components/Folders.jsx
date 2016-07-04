import React from 'react';
import Loader from 'react-loader';
import Options from '../components/Options';
import * as action from './actions/GenericAction';
import FolderThumb from './FolderThumb';
import Empty from './Empty';
import store from './store/FolderStore';
import Pagination from './Pagination';
import ReactPaginate from 'react-paginate';
import storeFolder from './store/FolderStore';

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

    getNext(data){
        var page = data.selected + 1;
        storeFolder.getAll(page);
    }

    complete(data){
      this.setState({
        folders: data.data.results,
        next:data.data.next,
        previous: data.data.previous,
        count: data.data.count,
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
        var paginate = '';
        if(this.state.next || this.state.previous){
          paginate = <ReactPaginate pageNum={this.state.count/8} pageRangeDisplayed={8} marginPagesDisplayed={8} containerClassName={"pagination pagination-sm right"} clickCallback={this.getNext} />;
        }
        return (
         <div class="row">
         <div class="col-md-12">
          <Loader loaded={this.state.loaded} top="75%" />
          {folders}
          </div>
          <div class="col-md-12">
            {paginate}
          </div>
         </div>
        );
    }
}
