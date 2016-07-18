import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader';
import Options from './Options';
import ShareButtons from './ShareButtons';
import store from './store/PhotoStore';
import * as Toast from './actions/ToastAction';


export default class extends React.Component {
  constructor(){
    super();
    this.deleteComplete = this.deleteComplete.bind(this);
  }

  deleteImage(e){
    e.preventDefault();
    this.setState({loaded: false});
    store.delete(this.id);
  }

  componentWillMount(){
    this.state = {
      loaded: true
    };
    store.on('deletePhoto', this.deleteComplete);
  }

  componentWillUnmount(){
    store.removeListener('deletePhoto', this.deleteComplete);
  }

  deleteComplete(data){
    this.setState({loaded:true});
    if(data.status == 204){
      Toast.ok('Photo deleted');
      var {folder_id} = this.props;
      store.getAll(1, folder_id);
    }else{
      Toast.error('Unable to complete request');
    }
  }

  getEffectUrl(url, effects){
    if(url === undefined || !effects)
      return url
    var paths = url.split('upload');
    return paths[0] + 'upload/' + effects + paths[1];
  }

  componentDidMount(){
      $('.preview').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
          verticalFit: true,
          titleSrc: function(item) {
            return item.el.attr('title');
          }
        },
        zoom: {
          enabled: true,
          duration: 300
        }
        });
  }

  render() {
      var {edited_image, image, id, share_code, title, page} = this.props;
      this.id = id;
      var image_src = edited_image ? edited_image + "?" + (new Date().getTime()) : image;
       const share_link = document.location.protocol + '//' + document.location.host + '/#/share/' + share_code;
      return (
        <div class="col-sm-4 col-md-3">
          <Loader loaded={this.state.loaded} />
          <div class="thumbnail">
            <Options editLink={ "editimage/" + id } deleteMethod={this.deleteImage.bind(this)} id={id} type={"image"} />
            <div class="crop">
              <a href={image_src} class="preview" title={title} >
                <img src={image_src} alt={title} />
              </a>
            </div>
            <div class="caption">
              <h5>{ title ? title : 'Untitled' } <ShareButtons share_link={share_link} /></h5>
            </div>
          </div>
        </div>
      );
  }
}
