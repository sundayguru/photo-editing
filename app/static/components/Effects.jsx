import React from 'react';

export default class extends React.Component {
  render() {
      const {change, check, effects} = this.props;
      return (
        <div class="row">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#appearance" data-toggle="tab" aria-expanded="false">Appearance</a></li>
              <li class=""><a href="/#adjustment" data-toggle="tab" aria-expanded="false">Adjustment</a></li>
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                  More Effects <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li class="active"><a href="#" data-toggle="tab" aria-expanded="true">Tranform</a></li>
                  <li class="active"><a href="#" data-toggle="tab" aria-expanded="true">Overlay</a></li>
                  <li class="divider"></li>
                  <li class=""><a href="#" data-toggle="tab" aria-expanded="false">Options</a></li>
                </ul>
              </li>
            </ul>
            <div id="myTabContent" class="tab-content">
              <div class="tab-pane fade active in" id="appearance">

                  <div class="form-group">
                    <label class="control-label w100" for="e_hue">
                      <span class="left">Hue </span>
                      <span class="right"><input type="checkbox" onChange={check} value="e_hue" checked={effects.e_hue} /></span>
                    </label>
                    <input type="range" id="e_hue" onChange={change} disabled={!effects.e_hue} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="e_brightness">
                      <span class="left">Brightness </span>
                      <span class="right"><input type="checkbox" onChange={check} value="e_brightness" checked={effects.e_brightness} /></span>
                    </label>
                    <input type="range" id="e_brightness" onChange={change} disabled={!effects.e_brightness} />
                  </div>

                  <div class="form-group">
                    <label class="control-label w100" for="e_contrast">
                      <span class="left">Contrast </span>
                      <span class="right"><input type="checkbox" onChange={check} value="e_contrast" checked={effects.e_contrast} /></span>
                    </label>
                    <input type="range" id="e_contrast" onChange={change} disabled={!effects.e_contrast} />
                  </div>

                  <div class="form-group">
                  <label class="control-label w100" for="e_saturation">
                      <span class="left">Saturation </span>
                      <span class="right"><input type="checkbox" onChange={check} value="e_saturation" checked={effects.e_saturation} /></span>
                    </label>
                    <input type="range" id="e_saturation" onChange={change}  disabled={!effects.e_saturation} />
                  </div>

              </div>
              <div class="tab-pane fade " id="adjustment">
                <p>Food truck fixie locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
              </div>
              <div class="tab-pane fade" id="transform">
                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeneys organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
              </div>
              <div class="tab-pane fade" id="overlay">
                <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
              </div>
            </div>
        </div>
      );
  }
}
