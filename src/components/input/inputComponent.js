import React, { Component } from 'react';
import './input.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '../../utils/fontAwesome';

class InputComponent extends Component {
    constructor() {
        super();
        this.state = {
            type: "text"
        }
    }

    listenToolClick(inputType) {
        this.setState({
            type: inputType
        })
    }

    render() {
        return (
            <span className="field-wrapper">
                <span className="field-toolbar" style={{position:"absolute", left:this.props.x+"px",
                    top:this.props.y-50+"px", width: this.props.width+"px"}}>
                    <button className={`field-tool ${this.state.type==='text' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "text")}>
                        <FontAwesomeIcon icon="font"></FontAwesomeIcon>
                    </button>
                    <button className={`field-tool ${this.state.type==='number' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "number")}>
                        #
                    </button>
                    <button className={`field-tool ${this.state.type==='file' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "file")}>
                        <FontAwesomeIcon icon="file"></FontAwesomeIcon>
                    </button>
                </span>
                <input type={this.state.type} id={this.props.id} name={this.props.id} onDragStart={this.props.listenDragStart}
                    onDragEnd={this.props.moveElement} draggable="true"
                    style={{position:"absolute", left:this.props.x+"px", top:this.props.y+"px",
                            width: this.props.width+"px", height: this.props.height+"px"}}/>
            </span>
        )
    }
}

export default InputComponent;
