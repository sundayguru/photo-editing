import React from 'react';
import storePhoto from './store/PhotoStore';
import Loader from 'react-loader';
import * as Toast from './actions/ToastAction';
import Effects from './Effects';
import ShareButtons from './ShareButtons';

export default class extends React.Component {
    constructor() {
      super();
      this.timer = null;
      this.updateComplete = this.updateComplete.bind(this);
      this.previewComplete = this.previewComplete.bind(this);
      this.detail = this.detail.bind(this);
      this.changeColor = this.changeColor.bind(this);
      this.defaultEffects = {'enhance':{}, 'filter':{}, 'transform':{}, 'effect':{}, 'text_overlay':{}, 'colorize':{}, 'border':{}};
    }

    componentWillMount(){
      this.state = {loaded: false, file:{}, effects:this.defaultEffects};
      const {id} = this.props.params;
      this.id = id;
      storePhoto.on('updatePhoto', this.updateComplete);
      storePhoto.on('previewPhoto', this.previewComplete);
      storePhoto.on('photo', this.detail);
      storePhoto.on('color', this.changeColor);
      storePhoto.get(id);
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

    componentWillUnmount(){
      storePhoto.removeListener('updatePhoto', this.updateComplete);
      storePhoto.removeListener('previewPhoto', this.previewComplete);
      storePhoto.removeListener('photo', this.detail);
      storePhoto.removeListener('color', this.changeColor);
    }

    detail(result){
      if(result.status == 200){
        var title = result.data.title;
        var effects = result.data.effects ? this.decodeEffects(result.data.effects) : this.defaultEffects;
        this.setState({file: result.data, loaded: true, effects: effects});
        $('#title').val(title);
      }
    }

    updateComplete(result){
      this.setState({loaded: true});
      if(result.status == 200){
        Toast.ok('Photo updated')
      }else{
        Toast.error('Unable to complete request')
      }
    }

    previewComplete(result){
      this.setState({loaded:true});
      $('.image-preview img').attr('src', 'data:image/jpeg;base64, ' + result.data.image)
      $('.preview').attr('href', 'data:image/jpeg;base64, ' + result.data.image)
    }

    handleChange(e) {
      var name = e.target.getAttribute('id');
      var value = e.target.value;
      var type = $(e.target).attr('data-type');
      this.updateEffect(type, name, value);
    }

    changeColor(result) {
      this.updateEffect(result.data.type, result.data.name, result.data.value);
    }

    addEffect(type, name, value){
      var effects = this.state.effects;
      effects[type][name] = value;
      this.setState({effects: effects});
      this.getEffectPreview();
    }

    removeEffect(type, name){
      var effects = this.state.effects;
      delete effects[type][name];
      this.setState({effects: effects});
      this.getEffectPreview();
    }

    updateEffect(type, name, value){
      var effects = this.state.effects;
      effects[type][name] = value;
      this.setState({effects: effects});
      if(!this.timer){
        var _this = this
        this.timer = setTimeout(function() {
          _this.timer = null;
          _this.getEffectPreview();
        }, 1000);
      }
    }

    getEffectPreview(){
      this.setState({loaded:false});
      var form = this.getFormData();
      storePhoto.preview(form);
    }

    decodeEffects(effectString){
      var effects = JSON.parse(effectString);
      for(var singleEffect in effects){
        for(var effect_type in effects[singleEffect]){
          $('#' + effect_type).val(effects[singleEffect][effect_type]);
        }
      }
      return effects;
    }

    handleCheck(e) {
      var type = $('#' + e.target.value).attr('data-type');
      if(e.target.checked){
        $('#' + e.target.value).attr('disabled', false);
        var value = $('#' + e.target.value).val();
        this.addEffect(type, e.target.value, value);
      }else{
        $('#' + e.target.value).attr('disabled', true);
        this.removeEffect(type, e.target.value);
      }
    }

    getFormData(){
      var form = new FormData();
      form.append('photo_id', this.id);
      form.append('id', this.state.file.id ? this.state.file.id : 0);
      form.append('effects', JSON.stringify(this.state.effects));
      form.append('title', $('#title').val());
      return form;
    }

    onSubmit(e) {
      e.preventDefault();
      this.setState({loaded: false});
      var form = this.getFormData();
      storePhoto.update(form);
    }

    render() {
      const share_link = document.location.protocol + '//' + document.location.host + '/#/share/' + this.state.file.share_code;
      var image_src = this.state.file.edited_image ? this.state.file.edited_image : this.state.file.image;
        return (
         <div class="col-md-12">
            <form class="form-horizontal" method="post" onSubmit={this.onSubmit.bind(this)}>
              <fieldset>
                <div class="col-md-6 no-pad-left">
                  <div class="image-preview">
                  <div class="col-lg-12 no-pad">
                      <a href={"/download/?image=" + this.state.file.id }  target="_blank" >Download</a>
                      <ShareButtons share_link={share_link} />
                  </div>
                    <Loader loaded={this.state.loaded} top="50%" left="50%" />
                    <a href={ image_src } class="preview" title="Zoom" >
                      <img src={ image_src } class="img-responsive" />
                    </a>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label" for="title">Title</label>
                    <input type="text" class="form-control" id="title" />
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
