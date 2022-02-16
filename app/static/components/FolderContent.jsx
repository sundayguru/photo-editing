import React from 'react';
import Photos from './Photos';

export default class extends React.Component {
  render() {
      const {id} = this.props.params
      $('#active-folder').val(id);
      return (
        <Photos folder_id={id} />
      );
  }
}
