import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './toolbar.scss';

import componentList from '../../config/componentList';
import fontawesome from '../../utils/fontAwesome';

class Toolbar extends Component {

    constructor() {
        super();
        this.state = {
            components: componentList
        }
        this.listenDragStart = this.listenDragStart.bind(this);
    }

    listenDragStart(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id);
    }

    render() {
        return this.state.components.map(component => (
                <li className="tool"
                    id={component.id} key={component.id}
                    onDragStart={this.listenDragStart}
                    draggable="true">
                        <span className="tool-icon">
                            <FontAwesomeIcon icon={component.icon}/>
                        </span>
                        {component.name}
                </li>
        ));
    }
}

export default Toolbar;
