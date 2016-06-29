import React from 'react';

export default class extends React.Component {
    constructor() {
      super();

    }
    handleChange(e) {
      console.log(e.target.value);
    }

    render() {
        return (
         <div class="col-md-12">
            <h3>Image Preview</h3>
            <form class="form-horizontal">
              <fieldset>
                <div class="col-md-7 no-pad-left">
                  <div class="image-preview">
                    <img src="../static/images/slides/1.jpg" alt="..." class="img-responsive"/>
                  </div>
                  <div class="progress progress-striped active">
                    <div class="progress-bar" style={{width:"50%"}}></div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label class="control-label" for="title">Title</label>
                    <input type="text" class="form-control" id="title"  />
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
                    <label class="control-label" for="brightness">Brightness </label>
                    <input type="range" id="brightness" defaultValue={0} onChange={this.handleChange} />
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
