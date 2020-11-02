import React, { Component } from 'react';
import './heading.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import fontawesome from '../../utils/fontAwesome';

class HeadingComponent extends Component {
    constructor() {
        super();
        this.state = {
            type: "h2"
        }
    }

    listenToolClick(headingType) {
        this.setState({
            type: headingType
        })
    }

    render() {
        let elm = React.createElement(this.state.type, {
                            id: this.props.id,
                            name: this.props.id,
                            onDragStart: this.props.listenDragStart,
                            onDragEnd: this.props.moveElement,
                            draggable: 'true',
                            style: {position:"absolute", left:this.props.x+"px", top:this.props.y+"px",
                                    width: this.props.width+"px", height: this.props.height+"px"}
                        }, this.props.id);
        return (
            <span className="field-wrapper">
                <span className="field-toolbar" style={{position:"absolute", left:this.props.x-30+"px",
                    top:this.props.y-50+"px", width: this.props.width+"px"}}>
                    <button className={`field-tool ${this.state.type==='h2' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "h2")}>
                        h2
                    </button>
                    <button className={`field-tool ${this.state.type==='h3' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "h3")}>
                        h3
                    </button>
                    <button className={`field-tool ${this.state.type==='h4' ? 'active': ''}`}
                        onClick={this.listenToolClick.bind(this, "h4")}>
                        h4
                    </button>
                </span>
                {elm}
            </span>
        )
    }
}

export default HeadingComponent;
