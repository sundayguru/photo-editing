import React from 'react';
import Loader from 'react-loader';
import SideNav from '../SideNav';
import storePhoto from '../store/PhotoStore';

export default class extends React.Component {
    constructor() {
      super();
      this.detail = this.detail.bind(this);
    }

    componentWillMount(){
      this.state = {loaded: false, file:{}};
      const {id} = this.props.params;
      this.id = id;
      storePhoto.getShare(id);
      storePhoto.on('sharePhoto', this.detail);
    }

    componentWillUnmount(){
      storePhoto.removeListener('sharePhoto', this.detail);
    }

    componentDidMount(){
        $('.preview').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          mainClass: 'mfp-img-mobile',
          image: {
            verticalFit: true,
            titleSrc: function(item) {
              return '';
            }
          },
          zoom: {
            enabled: true,
            duration: 300
          }
        });
    }

    detail(result){
      if(result.status == 200){
        this.setState({file: result.data, loaded: true});
      }else{
        document.location.href = '#/'
      }
    }

    render() {
        return (
        <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-3">
                    <SideNav />
                </div>
                <div class="col-lg-10 col-md-10 col-sm-9 center">
                   <div class="image-preview">
                      <Loader loaded={this.state.loaded} top="50%" left="50%" />
                      <a href={this.state.file.edited_image ? this.state.file.edited_image : this.state.file.image} class="preview" title="Zoom" >
                        <img src={this.state.file.edited_image ? this.state.file.edited_image : this.state.file.image}  />
                      </a>
                  </div>
                </div>
            </div>
        );
    }
}
