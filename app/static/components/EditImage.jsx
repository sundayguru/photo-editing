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
      this.state = {loaded: false, file:{}, effects:[]};
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
      //console.log(result)
      if(result.status == 200){
        this.setState({file:result.data, loaded:true});
        $('#title').val(result.data.detail.title);
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
      effects.push({name:name, value:value});
      this.setState({effects: effects});
    }

    removeEffect(name){
      var effects = this.state.effects;
      effects.forEach(function(item, index){
        if(item.name == name){
          effects.splice(index, 1);
        }
      });

    }

    updateEffect(name, value){
      var effects = this.state.effects;
      effects.forEach(function(item, index){
        if(item.name == name){
          effects[index].value = value;
        }
      });
      this.setState({effects: effects});
    }

    getEffects(){
      var effects = '';
      this.state.effects.forEach(function(item){
        effects += item.name + ':' + item.value + ',';
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
      form.append('id', this.state.file.detail.id);
      form.append('title', $('#title').val());
      storePhoto.update(form);
    }



    render() {
      console.log(this.state.effects);
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
                    <Effects change={this.handleChange.bind(this)} check={this.handleCheck.bind(this)} />
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
