import React from 'react';

export default class extends React.Component {
  render() {
      var {id, value, check, change, label, type} = this.props;
      return (
        <div class="form-group">
          <label class="control-label w100" for={id}>
            <span class="left">{label}{ value ? "(" + value + "%)" : "" }  </span>
            <span class="right"><input type="checkbox" onChange={check} value={id} checked={value} /></span>
          </label>
          <input type="range" id={id} onChange={change} disabled={!value} data-type={type} min="1" max="99" defaultValue={value} />
        </div>
      );
  }
}
