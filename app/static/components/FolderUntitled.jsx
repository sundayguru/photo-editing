import React from 'react';
import Photos from './Photos';

export default class extends React.Component {
  render() {
     $('#active-folder').val(0);
      return (
        <Photos folder_id={0} />
      );
  }
}
