import React from 'react';
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
      var {image_url, id, share_code, detail} = this.props;
      this.id = id;
      const image = detail.edited_image ? "data:image/jpeg;base64, " + detail.edited_image : image_url;
       const share_link = document.location.protocol + '//' + document.location.host + '/#/share/' + share_code;
      return (
        <div class="col-sm-4 col-md-3">
          <Loader loaded={this.state.loaded} />
          <div class="thumbnail">
            <Options editLink={ "editimage/" + id } deleteMethod={this.deleteImage.bind(this)} id={id} type={"image"} />
            <div class="crop">
              <a href={image} class="preview" title={detail.title} >
                <img src={image} alt={detail.title} />
              </a>
            </div>
            <div class="caption">
              <h5>{detail.title.length ? detail.title : 'Untiltled'} <ShareButtons share_link={share_link} /></h5>
            </div>
          </div>
        </div>
      );
  }
}
