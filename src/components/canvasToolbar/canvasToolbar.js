import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './canvasToolbar.scss';
import fontawesome from '../../utils/fontAwesome';

class CanvasToolbar extends Component {
    render() {
        return (
            <ul id="canvas-toolbar">
                <li onClick={this.props.clearCanvas} key="clear">
                    <span className="tool-icon">
                        <FontAwesomeIcon icon="trash"/>
                    </span>
                    Clear All
                </li>
                <li key="settings">
                    <span className="tool-icon">
                        <FontAwesomeIcon icon="cog"/>
                    </span>
                    Settings
                </li>
            </ul>
        )
    }
}

export default CanvasToolbar;
