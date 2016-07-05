import React from 'react';

export default class extends React.Component {
  render() {
      var {column, value} = this.props;
      return (
        <tr>
          <th>{column}</th>
          <td>{value}</td>
        </tr>
      );
  }
}
