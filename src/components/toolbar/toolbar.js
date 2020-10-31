import React, { Component } from 'react';
import './toolbar.scss';

class Toolbar extends Component {

    state = {
        components: []
    }

    constructor() {
        super();
        this.listenDragStart = this.listenDragStart.bind(this);
    }

    componentDidMount() {

            // this.state.components.map(item => {
            //      (
            //         <li className="tool"
            //             id="input"
            //             onDragStart={this.listenDragStart}
            //             draggable="true">
            //         Input
            //         </li> )
            // });
    }

    listenDragStart(ev) {
        console.log("dragStart");
        ev.dataTransfer.setData("text/plain", ev.target.id);
    }

    render() {
        return (
            <ul className="toolbar">
                <li className="tool" key="input" id="input"
                    onDragStart={this.listenDragStart} draggable="true">Input</li>
                <li className="tool" id="select" key="select"
                    onDragStart={this.listenDragStart} draggable="true">Select</li>
                <li className="tool" id="textarea" key="textarea"
                    onDragStart={this.listenDragStart} draggable="true">Text Area</li>
                <li className="tool" id="paragraph" key="paragraph"
                    onDragStart={this.listenDragStart} draggable="true">Paragraph</li>
                <li className="tool" id="heading" key="heading"
                    onDragStart={this.listenDragStart} draggable="true">Heading</li>
                <li className="tool" id="button" key="button" 
                    onDragStart={this.listenDragStart} draggable="true">Button</li>
            </ul>
        );
    }

    initComponents() {
        this.setState({
            components: [{
                id: 'input',
                name: 'Input'
            },
            {
                id: 'select',
                name: 'Select'
            },
            {
                id: 'textarea',
                name: 'Text Area'
            },
            {
                id: 'paragraph',
                name: 'Paragraph'
            },
            {
                id: 'heading',
                name: 'Heading'
            },
            {
                id: 'button',
                name: 'Button'
            }
        ]
        })
    }
}

export default Toolbar;
