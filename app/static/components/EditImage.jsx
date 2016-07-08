import React from 'react';
import storePhoto from './store/PhotoStore';
import Loader from 'react-loader';
import * as Toast from './actions/ToastAction';
import Effects from './Effects';

export default class extends React.Component {
    constructor() {
      super();
      this.updateComplete = this.updateComplete.bind(this);
      this.detail = this.detail.bind(this);
    }

    componentWillMount(){
      this.state = {loaded: false, file:{}, effects:{}};
      const {id} = this.props.params;
      this.id = id;
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
        var title = result.data.detail ? result.data.detail.title : ''
        var effects = result.data.detail.effects ? this.decodeEffects(result.data.detail.effects) : {};
        this.setState({file: result.data, loaded: true, effects: effects});
        $('#title').val(title);
      }
    }

    updateComplete(result){
      if(result.status == 200){
        Toast.ok('Photo updated')
      }else{
        Toast.error('Unable to complete request')
      }
    }

    handleChange(e) {
      var name = e.target.getAttribute('id');
      var value = e.target.value;
      this.updateEffect(name, value);
    }

    addEffect(name, value){
      var effects = this.state.effects;
      effects[name] = value;
      this.setState({effects: effects});
    }

    removeEffect(name){
      var effects = this.state.effects;
      delete effects[name];
      this.setState({effects: effects});
    }

    updateEffect(name, value){
      var effects = this.state.effects;
      effects[name] = value;
      this.setState({effects: effects});
    }

    getEffects(){
      var effects = '';
      for(name in this.state.effects){
        effects += name + ':' + this.state.effects[name] + '/';
      }
      return effects;
    }

    decodeEffects(effectString){
      var effects = {};
      var args = effectString.split('/');
      args.forEach(function(singleEffect){
        if(singleEffect){
          var e = singleEffect.split(':');
          effects[e[0]] = e[1];
          $('#' + e[0]).val(e[1]);
        }
      });
      return effects;
    }

    getEffectUrl(url){
      if(url === undefined)
        return

      var paths = url.split('upload');
      return paths[0] + 'upload/' + this.getEffects() + paths[1];
    }


    handleCheck(e) {
      if(e.target.checked){
        $('#' + e.target.value).attr('disabled', false);
        var value = $('#' + e.target.value).val();
        this.addEffect(e.target.value, value);
      }else{
        $('#' + e.target.value).attr('disabled', true);
        this.removeEffect(e.target.value);
      }
    }

    onSubmit(e) {
      e.preventDefault();
      var form = new FormData();
      form.append('photo_id', this.id);
      form.append('id', this.state.file.detail.id ? this.state.file.detail.id : 0);
      form.append('effects', this.getEffects());
      form.append('title', $('#title').val());
      storePhoto.update(form);
    }



    render() {
        return (
         <div class="col-md-12">
            <h3>Image Preview <Loader loaded={this.state.loaded} top="7%" left="25%" /></h3>
            <form class="form-horizontal" method="post" onSubmit={this.onSubmit.bind(this)}>
              <fieldset>
                <div class="col-md-6 no-pad-left">
                  <div class="image-preview">
                    <img src={this.getEffectUrl(this.state.file.url)} alt="..." class="img-responsive"/>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label" for="title">Title</label>
                    <input type="text" class="form-control" id="title" defaultValue={this.state.file.image} />
                  </div>
                  <div class="col-md-12">
                    <Effects change={this.handleChange.bind(this)} check={this.handleCheck.bind(this)} effects={this.state.effects} />
                  </div>

                  <div class="form-group">
                    <input type="submit" value="Save" class="btn btn-primary right" />
                  </div>

                </div>
              </fieldset>
            </form>
         </div>
        );
    }
}
