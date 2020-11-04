import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './canvasToolbar.scss';
import fontawesome from '../../utils/fontAwesome';

class CanvasToolbar extends Component {
    /**
     * Lifecycle method that renders React Elements in DOM
     */
    render() {
        return (
            <ul id="canvas-toolbar">
                <li className="action-btn" onClick={this.props.clearCanvas} key="clear">
                    <span className="tool-icon">
                        <FontAwesomeIcon icon="trash"/>
                    </span>
                    Clear All
                    <span className="countIndicator">{this.props.componentCount}</span>
                </li>
            </ul>
        )
    }
}

export default CanvasToolbar;
