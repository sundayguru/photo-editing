import React from 'react';

export default class extends React.Component {
  render() {
      var {id, value, check, label, type} = this.props;
      return (
        <div class="form-group">
          <label class="control-label w100" for={id}>
            <span class="left">{label}  </span>
            <span class="right"><input type="checkbox" onChange={check} value={id} checked={value} /></span>
          </label>
          <input type="hidden" id={id} data-type={type} value={true} />
        </div>
      );
  }
}
