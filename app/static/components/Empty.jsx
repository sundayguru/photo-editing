import React from 'react';

export default class extends React.Component {
  render() {
      var {title} = this.props;
      return (
         <div class="col-sm-12">
            <p class="empty">
              <img src="../static/images/FolderEmpty.png" /><br/>
              <span>{ title !== undefined ? title : "Empty folder" }</span>
            </p>
          </div>
      );
  }
}
