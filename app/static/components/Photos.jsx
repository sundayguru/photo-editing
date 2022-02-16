import React from 'react';
import Loader from 'react-loader';
import Options from '../components/Options';
import store from './store/PhotoStore';
import Empty from './Empty';
import ReactPaginate from 'react-paginate';
import PhotoThumb from './PhotoThumb';

export default class extends React.Component {
    constructor() {
      super();
      this.listPhotos = this.listPhotos.bind(this);
    }

    getNext(data){
        store.getAll(data.selected + 1, this.state.folder_id);
    }

    componentWillMount(){
      const {folder_id} = this.props;
      if(folder_id === undefined){
        $('#active-folder').val(0);
      }
      this.state = {
        loaded:false,
        photos:[],
        folder_id: folder_id ? folder_id : 0
      }
      store.on('photos', this.listPhotos);
      store.getAll(1, folder_id);
    }

    componentWillUnmount(){
      store.removeListener('photos', this.listPhotos);
    }

    listPhotos(data){
      this.setState({
        photos: data.data.results,
        count: data.data.count,
        next:data.data.next,
        previous: data.data.previous,
        loaded: true
      });
    }

    render() {
        const photos = this.state.photos.map((item) => { return <PhotoThumb key={item.id} folder_id={this.state.folder_id} {...item} /> });
        if(!photos.length && this.state.loaded){
          return (
            <Empty title="No image found" />
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
              {photos}
            </div>
            <div class="col-md-12">
              {paginate}
            </div>
         </div>
        );
    }
}
