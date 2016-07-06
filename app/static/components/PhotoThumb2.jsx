import React from 'react';
import Loader from 'react-loader';
import Options from './Options';
import store from './store/PhotoStore';
import * as Toast from './actions/ToastAction';


export default class extends React.Component {

  constructor(){
    super();
    this.state = {
      loaded: true
    };
    this.deleteComplete = this.deleteComplete.bind(this);

  }

  deleteImage(){
    this.setState({loaded: false});
    store.delete(this.id);
  }

  componentWillMount(){
    store.on('deletePhoto', this.deleteComplete);
  }

  componentWillUnmount(){
    store.removeListener('deletePhoto', this.deleteComplete);
  }

  deleteComplete(data){
    this.setState({loaded:true});
    if(data.status == 204){
      Toast.ok('Photo deleted');
      store.getAll();
    }else{
      Toast.error('Unable to complete request');
    }

  }


  render() {
      var {url, thumb, id} = this.props;
      this.id = id;
      return (
         <div class="col-sm-4 col-md-3">
            <Loader loaded={this.state.loaded} />
            <div class="thumbnail">
            <Options editLink={ "editimage/" + id } deleteMethod={this.deleteImage.bind(this)} id={id} />
            <a href={url} class="preview" title="test image">
              <img src={thumb} alt="..." /> </a>
              <div class="caption">
                <h5>Campaign for beauty</h5>
              </div>
            </div>
          </div>
      );
  }
}
