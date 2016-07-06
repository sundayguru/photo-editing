import React from 'react';
import storePhoto from './store/PhotoStore';
import Loader from 'react-loader';
import * as Toast from './actions/ToastAction';

export default class extends React.Component {
    constructor() {
      super();
      this.updateComplete = this.updateComplete.bind(this);
      this.detail = this.detail.bind(this);
    }

    componentWillMount(){
      this.state = {loaded: false, file:{}};
      const {id} = this.props.params;
      storePhoto.get(id);
      storePhoto.on('updatePhoto', this.updateComplete);
      storePhoto.on('singlePhoto', this.detail);
    }

    componentWillUnmount(){
      storePhoto.removeListener('updatePhoto', this.updateComplete);
      storePhoto.removeListener('singlePhoto', this.detail);
    }

    detail(result){
      if(result.status == 200){
        this.setState({file:result.data, loaded:true});
        console.log(result.data);
        $('#title').val(result.data.image);
      }
    }

    updateComplete(result){
      console.log(result);
    }

    handleChange(e) {
      console.log(e.target.value);
    }

    render() {
        return (
         <div class="col-md-12">

            <h3>Image Preview <Loader loaded={this.state.loaded} top="7%" left="25%" /></h3>
            <form class="form-horizontal">
              <fieldset>
                <div class="col-md-7 no-pad-left">
                  <div class="image-preview">
                    <img src={this.state.file.url} alt="..." class="img-responsive"/>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label class="control-label" for="title">Title</label>
                    <input type="text" class="form-control" id="title" defaultValue={this.state.file.image} />
                  </div>
                  <div class="row">
                  <div class="col-md-6 no-pad">
                    <p>Image Adjustments</p>

                  </div>
                  <div class="col-md-6">
                    <div class="btn-group right">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">Add Effect <span class="caret"></span></a>
                      <ul class="dropdown-menu">
                        <li><a href="#">Saturation</a></li>
                        <li><a href="#">Brightness</a></li>
                        <li><a href="#">Hue</a></li>
                        <li class="divider"></li>
                        <li><a href="#">RGB</a></li>
                      </ul>
                    </div>
                  </div>

                  </div>


                   <div class="form-group">
                    <label class="control-label w100" for="brightness"><span class="left">Brightness </span> <span class="right"><input type="checkbox" /></span></label>

                    <input type="range" id="brightness" defaultValue={0} onChange={this.handleChange} disabled={true}/>
                  </div>
                   <div class="form-group">
                    <label class="control-label" for="saturation">Saturation</label>
                    <input type="range" id="saturation" defaultValue={0} onChange={this.handleChange} />
                  </div>

                </div>
              </fieldset>
            </form>
         </div>
        );
    }
}
