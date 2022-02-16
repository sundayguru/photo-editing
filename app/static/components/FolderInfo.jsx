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
      <table class="table table-striped table-hover ">
        <tbody>
          <ModalTableRow column="Created Datetime" value={this.niceDatetime(data.date_created)} />
          <ModalTableRow column="Modified Datetime" value={this.niceDatetime(data.date_modified)} />
        </tbody>
      </table>

      );
  }
}
