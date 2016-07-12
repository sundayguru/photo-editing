import React from 'react';

export default class extends React.Component {
  render() {
      const {change, check, effects} = this.props;
      return (
        <div class="row">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#enhance" data-toggle="tab" aria-expanded="false">Enhance</a></li>
              <li class=""><a href="/#filter" data-toggle="tab" aria-expanded="false">Filter</a></li>
              <li class=""><a href="/#transform" data-toggle="tab" aria-expanded="false">Tranform</a></li>
              <li class=""><a href="/#overlay" data-toggle="tab" aria-expanded="false">Overlay</a></li>
            </ul>
            <div id="myTabContent" class="tab-content">
              <div class="tab-pane fade active in" id="enhance">
                  <div class="form-group">
                    <label class="control-label w100" for="Brightness">
                      <span class="left">Brightness{ effects.enhance.Brightness ? "(" + effects.enhance.Brightness + "%)" : "" } </span>
                      <span class="right"><input type="checkbox" onChange={check} value="Brightness" checked={effects.enhance.Brightness} /></span>
                    </label>
                    <input type="range" id="Brightness" onChange={change} disabled={!effects.enhance.Brightness} data-type="enhance" />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="Contrast">
                      <span class="left">Contrast{ effects.enhance.Contrast ? "(" + effects.enhance.Contrast + "%)" : "" }  </span>
                      <span class="right"><input type="checkbox" onChange={check} value="Contrast" checked={effects.enhance.Contrast} /></span>
                    </label>
                    <input type="range" id="Contrast" onChange={change} disabled={!effects.enhance.Contrast} data-type="enhance" />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="Color">
                      <span class="left">Color{ effects.enhance.Color ? "(" + effects.enhance.Color + "%)" : "" }  </span>
                      <span class="right"><input type="checkbox" onChange={check} value="Color" checked={effects.enhance.Color} /></span>
                    </label>
                    <input type="range" id="Color" onChange={change} disabled={!effects.enhance.Color} data-type="enhance" />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="Sharpness">
                      <span class="left">Sharpness{ effects.enhance.Sharpness ? "(" + effects.enhance.Sharpness + "%)" : "" }  </span>
                      <span class="right"><input type="checkbox" onChange={check} value="Sharpness" checked={effects.enhance.Sharpness} /></span>
                    </label>
                    <input type="range" id="Sharpness" onChange={change} disabled={!effects.enhance.Sharpness} data-type="enhance" />
                  </div>

              </div>
              <div class="tab-pane fade " id="filter">

                  <div class="form-group">
                    <label class="control-label w100" for="blur">
                      <span class="left">Blur </span>
                      <span class="right"><input type="checkbox" onChange={check} value="blur" checked={effects.filter.blur} /></span>
                    </label>
                    <input type="hidden" id="blur" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="contour">
                      <span class="left">Contour </span>
                      <span class="right"><input type="checkbox" onChange={check} value="contour" checked={effects.filter.contour} /></span>
                    </label>
                    <input type="hidden" id="contour" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="detail">
                      <span class="left">Detail </span>
                      <span class="right"><input type="checkbox" onChange={check} value="detail" checked={effects.filter.detail} /></span>
                    </label>
                    <input type="hidden" id="detail" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="edge_enhance">
                      <span class="left">Edge Enhance </span>
                      <span class="right"><input type="checkbox" onChange={check} value="edge_enhance" checked={effects.filter.edge_enhance} /></span>
                    </label>
                    <input type="hidden" id="edge_enhance" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="edge_enhance_more">
                      <span class="left">Edge Enhance More </span>
                      <span class="right"><input type="checkbox" onChange={check} value="edge_enhance_more" checked={effects.filter.edge_enhance_more} /></span>
                    </label>
                    <input type="hidden" id="edge_enhance_more" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="emboss">
                      <span class="left">Emboss </span>
                      <span class="right">
                      <input type="checkbox" onChange={check} value="emboss" checked={effects.filter.emboss} />
                      </span>
                    </label>
                    <input type="hidden" id="emboss" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="find_edges">
                      <span class="left">Find Edges </span>
                      <span class="right">
                      <input type="checkbox" onChange={check} value="find_edges" checked={effects.filter.find_edges} />
                      </span>
                    </label>
                    <input type="hidden" id="find_edges" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="smooth">
                      <span class="left">Smooth </span>
                      <span class="right">
                      <input type="checkbox" onChange={check} value="smooth" checked={effects.filter.smooth} />
                      </span>
                    </label>
                    <input type="hidden" id="smooth" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="smooth_more">
                      <span class="left">Smooth More</span>
                      <span class="right">
                      <input type="checkbox" onChange={check} value="smooth_more" checked={effects.filter.smooth_more} />
                      </span>
                    </label>
                    <input type="hidden" id="smooth_more" data-type="filter" value={true} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="sharpen">
                      <span class="left">Sharpen</span>
                      <span class="right">
                      <input type="checkbox" onChange={check} value="sharpen" checked={effects.filter.sharpen} />
                      </span>
                    </label>
                    <input type="hidden" id="sharpen" data-type="filter" value={true} />
                  </div>

              </div>
             <div class="tab-pane fade " id="transform">
                <p>transform here</p>
              </div>
             <div class="tab-pane fade " id="overlay">
                <p>Overlay here</p>
              </div>

            </div>
        </div>
      );
  }
}
