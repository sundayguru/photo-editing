import React from 'react';

export default class extends React.Component {

  render() {
      const {share_link} = this.props;
      var link = encodeURIComponent(share_link)
      return (
        <div class="share right">
          <div class="btn-group">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" title="Share"> <i class="mdi mdi-share-variant"></i> </a>
              <ul class="dropdown-menu dropdown-menu-left">
                  <li>
                      <a href={ "https://www.facebook.com/sharer/sharer.php?u=" + link } target="_blank"><i class="mdi mdi-facebook"></i> Facebook</a>
                  </li>
                  <li>
                      <a href={ "https://twitter.com/intent/tweet?text="  + link } target="_blank"><i class="mdi mdi-twitter"></i> Twitter</a>
                  </li>
                  <li>
                      <a href={ "https://plus.google.com/share?url="  + link } target="_blank"><i class="mdi mdi-google-plus"></i> Google</a>
                  </li>
              </ul>
          </div>
        </div>
      );
  }
}
