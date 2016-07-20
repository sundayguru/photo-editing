import React from 'react';
import RangeField from './forms/RangeField';
import InputField from './forms/InputField';
import CheckboxField from './forms/CheckboxField';
import SelectField from './forms/SelectField';
import ColorField from './forms/ColorField';

export default class extends React.Component {
    constructor(){
        super()
        this.fonts = [
            {label:'Honey I spilt Verdana', name:'Honey-I-spilt-Verdana.ttf'},
            {label:'Design Graffiti', name:'design.graffiti.jd.ttf'},
            {label:'Complete in Him', name:'dahot.Complete in Him.ttf'},
            {label:'Comes in Handy', name:'dahot2.comesinhandy.ttf'},
            {label:'Filxgirl', name:'dahot2.Filxgirl.ttf'},
            {label:'Heart', name:'hearts1.ttf'},
            {label:'Mashyval', name:'mashyval.ttf'},
            {label:'Manipulative Lovers', name:'SC Manipulative Lovers Demo.ttf'},
            {label:'Unicode Freehand', name:'unicode.freehani.ttf'},
        ]
    }

  render() {
      const {change, check, effects} = this.props;
      return (
        <div class="row">
            <ul class="nav nav-tabs row">
              <li class="active"><a href="#enhance" data-toggle="tab" aria-expanded="false">Enhance</a></li>
              <li><a href="/#filter" data-toggle="tab" aria-expanded="false">Filter</a></li>
              <li><a href="/#transform" data-toggle="tab" aria-expanded="false">Tranform</a></li>
              <li><a href="/#effects" data-toggle="tab" aria-expanded="false">Effects</a></li>
               <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    More <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                    <li><a href="/#textLayer" data-toggle="tab" aria-expanded="false">Text Overlay</a></li>
                    <li><a href="#image_colorize" data-toggle="tab">Colorize</a></li>
                    <li><a href="#image_border" data-toggle="tab">Border</a></li>
                    </ul>
                </li>
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
                <div class="tab-pane fade " id="textLayer">
                    <InputField id="textValue" label="Text" value={effects.text_overlay.textValue} check={check} change={change} type="text_overlay" />
                    <RangeField id="fontSize" label="Font Size" value={effects.text_overlay.fontSize} check={check} change={change} type="text_overlay" />
                    <RangeField id="x" label="Horizontal Position" value={effects.text_overlay.x} check={check} change={change} type="text_overlay" />
                    <RangeField id="y" label="Vertical Position" value={effects.text_overlay.y} check={check} change={change} type="text_overlay" />
                    <ColorField id="color" label="Text Color" value={effects.text_overlay.color} check={check} change={change} type="text_overlay" />
                    <SelectField id="font_name" label="Font" value={effects.text_overlay.font_name} check={check} change={change} options={this.fonts} defaultOption="Honey-I-spilt-Verdana.ttf" type="text_overlay" />
                </div>
                 <div class="tab-pane fade " id="image_colorize">
                    <ColorField id="black" label="Black Color" value={effects.colorize.black} check={check} change={change} defaultColor="#000000" type="colorize" />
                    <ColorField id="white" label="White Color" value={effects.colorize.white} check={check} change={change} defaultColor="#ffffff"  type="colorize" />
                </div>  
                <div class="tab-pane fade " id="image_border">
                    <RangeField id="size" label="Size" value={effects.border.size} check={check} change={change} type="border" />
                    <ColorField id="border_color" label="Border Color" value={effects.border.border_color} check={check} change={change} defaultColor="#000000" type="border" />
                </div>
            </div>
        </div>
      );
  }
}
