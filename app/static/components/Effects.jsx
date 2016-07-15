import React from 'react';
import RangeField from './forms/RangeField';
import CheckboxField from './forms/CheckboxField';

export default class extends React.Component {
  render() {
      const {change, check, effects} = this.props;
      return (
        <div class="row">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#enhance" data-toggle="tab" aria-expanded="false">Enhance</a></li>
              <li class=""><a href="/#filter" data-toggle="tab" aria-expanded="false">Filter</a></li>
              <li class=""><a href="/#transform" data-toggle="tab" aria-expanded="false">Tranform</a></li>
              <li class=""><a href="/#effects" data-toggle="tab" aria-expanded="false">Effects</a></li>
            </ul>
            <div id="myTabContent" class="tab-content">
              <div class="tab-pane fade active in" id="enhance">
                  <RangeField id="Brightness" label="Brightness" value={effects.enhance.Brightness} check={check} change={change} type="enhance" />
                  <RangeField id="Contrast" label="Contrast" value={effects.enhance.Contrast} check={check} change={change} type="enhance" />
                  <RangeField id="Color" label="Color" value={effects.enhance.Color} check={check} change={change} type="enhance" />
                  <RangeField id="Sharpness" label="Sharpness" value={effects.enhance.Sharpness} check={check} change={change} type="enhance" />
              </div>
              <div class="tab-pane fade " id="filter">
                  <CheckboxField id="blur" label="Blur" value={effects.filter.blur} check={check} type="filter" />
                  <CheckboxField id="contour" label="Contour" value={effects.filter.contour} check={check} type="filter" />
                  <CheckboxField id="detail" label="Detail" value={effects.filter.detail} check={check} type="filter" />
                  <CheckboxField id="edge_enhance" label="Edge Enhance " value={effects.filter.edge_enhance} check={check} type="filter" />
                  <CheckboxField id="edge_enhance_more" label="Edge Enhance More" value={effects.filter.edge_enhance_more} check={check} type="filter" />
                  <CheckboxField id="emboss" label="Emboss" value={effects.filter.emboss} check={check} type="filter" />
                  <CheckboxField id="find_edges" label="Find Edges" value={effects.filter.find_edges} check={check} type="filter" />
                  <CheckboxField id="smooth" label="Smooth" value={effects.filter.smooth} check={check} type="filter" />
                  <CheckboxField id="smooth_more" label="Smooth More" value={effects.filter.smooth_more} check={check} type="filter" />
                  <CheckboxField id="sharpen" label="Sharpen" value={effects.filter.sharpen} check={check} type="filter" />
              </div>
             <div class="tab-pane fade " id="transform">
                  <CheckboxField id="vertical_flip" label="Vertical Flip" value={effects.transform.vertical_flip} check={check} type="transform" />
                  <CheckboxField id="mirror" label="Mirror" value={effects.transform.mirror} check={check} type="transform" />
                  <CheckboxField id="invert" label="Invert" value={effects.transform.invert} check={check} type="transform" />
                  <CheckboxField id="grayscale" label="Gray Scale" value={effects.transform.grayscale} check={check} type="transform" />
                  <CheckboxField id="black_and_white" label="Black and White" value={effects.transform.black_and_white} check={check} type="transform" />
                  <CheckboxField id="equalize" label="Equalize" value={effects.transform.equalize} check={check} type="transform" />
              </div>
             <div class="tab-pane fade " id="effects">
                  <RangeField id="quantize" label="Quantize" value={effects.effect.quantize} check={check} change={change} type="effect" />
                  <RangeField id="gaussian_blur" label="Gaussian Blur" value={effects.effect.gaussian_blur} check={check} change={change} type="effect" />
                  <RangeField id="auto_contrast" label="Auto Contrast" value={effects.effect.auto_contrast} check={check} change={change} type="effect" />
                  <RangeField id="posterize" label="Posterize" value={effects.effect.posterize} check={check} change={change} type="effect" />
                  <RangeField id="unsharp_mask" label="Unsharp Mask" value={effects.effect.unsharp_mask} check={check} change={change} type="effect" />
                  <RangeField id="solarize" label="Solarize" value={effects.effect.solarize} check={check} change={change} type="effect" />
                  <RangeField id="remove_border" label="Zoom" value={effects.effect.remove_border} check={check} change={change} type="effect" />
                  <RangeField id="rotate" label="Rotate" value={effects.effect.rotate} check={check} change={change} type="effect" />
              </div>
             <div class="tab-pane fade " id="other">
                <p>Overlay here</p>
              </div>
            </div>
        </div>
      );
  }
}
