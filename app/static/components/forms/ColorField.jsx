import React from 'react';
import { SketchPicker } from 'react-color';
import * as genericAction from '../actions/GenericAction';

export default class extends React.Component {

    handleChange(color){
        $('#'+this.id).val(color.hex);
        var type = $('#'+this.id).attr('data-type');
        this.setState({color:color.hex});
        genericAction.perform({value:color.hex, type:type, name:this.id}, 'COLOR_CHANGE');
    }
    
    componentWillMount(){
        var {id, value, defaultColor} = this.props;
        this.id = id;
        var color = value == undefined ? defaultColor : value;
        this.state = {color:color};
    }

    render() {
        var {id, value, check, change, label, type, defaultColor} = this.props;
        if(value == ''){
            this.state.color = defaultColor;
        }else if(value){
            this.state.color = value;
        }
            
        return (
            <div class="form-group">
            <label class="control-label w100" for={id}>
                <span class="left">{label} </span>
                <span class="right"><input type="checkbox" onChange={check} value={id} checked={ value == undefined ? false : true } /></span>
            </label>
            <div style={{display: value == undefined ? "none" : "block" }}> 
                <SketchPicker onChange={this.handleChange.bind(this)} color={this.state.color} /> 
            </div>

            <input type="hidden" id={id} onChange={change}  data-type={type} defaultValue={value} class="form-control" />
            </div>
        );
    }
}
