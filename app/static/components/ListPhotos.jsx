import React from 'react';
import Loader from 'react-loader';
import Options from '../components/Options';
import store from './store/PhotoStore';
import Empty from './Empty';
import ReactPaginate from 'react-paginate';
import PhotoThumb from './PhotoThumb';

export default class extends React.Component {
    getNext(data){
        var page = data.selected + 1;
        store.getAll(page);
    }

    componentWillMount(){
      this.state = {
        loaded:false,
        photos:[]
      }
      store.on('photos', this.listPhotos);
      store.getAll();
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
        const photos = this.state.photos.map((item) => { return <PhotoThumb key={item.id} {...item}/> });
        if(!photos.length){
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
