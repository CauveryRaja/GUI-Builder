import React, { Component } from 'react';
import './input.scss';

class InputComponent extends Component {
    render() {
        return (
            <input type="text" id={this.props.id} name={this.props.id} onDragStart={this.props.listenDragStart}
                onDragEnd={this.props.moveElement} draggable="true"
                style={{position:"absolute", left:this.props.x+"px", top:this.props.y+"px",
                        width: this.props.width+"px", height: this.props.height+"px"}}/>
        )
    }
}

export default InputComponent;
