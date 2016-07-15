import React from 'react';
import ModalTableRow from './ModalTableRow';

export default class extends React.Component {
  niceDatetime(date_time){
    if(date_time == undefined)
      return
    var dt = date_time.split('.');
    return dt[0].replace('T', " ");
  }

  render() {
      var {data} = this.props;
      return (
      <table class="table table-striped table-hover">
        <tbody>
          <ModalTableRow column="Folder Name" value={data.folder_name} />
          <ModalTableRow column="Uploader" value={data.uploader} />
          <ModalTableRow column="File Size" value={data.file_size + ' KB'} />
          <ModalTableRow column="Created Datetime" value={this.niceDatetime(data.date_created)} />
          <ModalTableRow column="Last Modified" value={this.niceDatetime(data.date_modified)} />
          <ModalTableRow column="Share Link" value={ document.location.protocol + '//' + document.location.host + '/#/share/' + data.share_code} />
        </tbody>
      </table>
      );
  }
}
