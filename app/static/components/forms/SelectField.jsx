import React from 'react';

export default class extends React.Component {
  render() {
      var {id, value, check, change, label, type, options, defaultOption } = this.props;
      var optionsMap = options.map((item, index) => { return <option key={index} value={item.name}>{item.label}</option> })
      return (
        <div class="form-group">
          <label class="control-label w100" for={id}>
            <span class="left">{label} </span>
            <span class="right"><input type="checkbox" onChange={check} value={id} checked={ value == undefined ? false : true } /></span>
          </label>
          <select id={id} onChange={change} disabled={!value} data-type={type}  class="form-control" >
          <option value={defaultOption} >Select {label}</option>
          {optionsMap}
          </select>
        </div>
      );
  }
}
