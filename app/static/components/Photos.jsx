import React from 'react';
import Options from '../components/Options';

export default class extends React.Component {
    constructor() {
      super();

    }

    componentDidMount(){
        $('.preview').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          mainClass: 'mfp-img-mobile',
          image: {
            verticalFit: true,
            titleSrc: function(item) {
              return item.el.attr('title') + '<small><a href="#">share</a></small>';
            }
          },
          zoom: {
            enabled: true,
            duration: 300
          }

          });
    }

    render() {
        return (
         <div class="row">

          <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options />
              <a href="../static/images/slides/1.jpg" class="preview" title="test image">
              <img src="../static/images/slides/1.jpg" alt="..." /> </a>
              <div class="caption">
                <h5>Campaign for beauty</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options />
              <a href="../static/images/slides/1.jpg" class="preview" title="test image"> <img src="../static/images/slides/1.jpg" alt="..." /> </a>
              <div class="caption">
                <h5>Campaign for beauty</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options />
              <a href="../static/images/slides/1.jpg" class="preview" title="test image"> <img src="../static/images/slides/1.jpg" alt="..." /> </a>
              <div class="caption">
                <h5>Campaign for beauty</h5>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-md-3">
            <div class="thumbnail">
            <Options />
              <a href="../static/images/slides/1.jpg" class="preview" title="test image"> <img src="../static/images/slides/1.jpg" alt="..." /> </a>
              <div class="caption">
                <h5>Campaign for beauty</h5>
              </div>
            </div>
          </div>


        </div>
        );
    }
}
