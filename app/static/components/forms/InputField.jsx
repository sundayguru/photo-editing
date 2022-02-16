import React from 'react';

export default class extends React.Component {
  render() {
      var {id, value, check, change, label, type} = this.props;
      return (
        <div class="form-group">
          <label class="control-label w100" for={id}>
            <span class="left">{label} </span>
            <span class="right"><input type="checkbox" onChange={check} value={id} checked={ value == undefined ? false : true } /></span>
          </label>
          <input type="text" id={id} onChange={change} disabled={!value} data-type={type} defaultValue={value} class="form-control" />
        </div>
      );
  }
}
