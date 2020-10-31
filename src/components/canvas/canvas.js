import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './canvas.scss';

import UniqueKeyGenTable from '../../models/key-table';
import componentProps from '../../config/component-props';

class DropCanvas extends Component {
    state = {
        componentMarkups: {}
    };

    constructor() {
        super();
        this.keyMap = new UniqueKeyGenTable();
        this.bindEventListeners();
    }

    componentDidMount() {
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        let target = document.getElementById('canvas');
        let componentIds = Object.keys(droppedComponents);
        // droppedComponents.forEach((item, i) => {
        //     this.renderElement(target, item.componentType, item.x, item.y);
        // });
        componentIds.forEach((id, i) => {
            let item = droppedComponents[id];
            this.renderElement(target, item.componentType, id, item.x, item.y)
        });

    }

    listenDragStart(ev) {
        ev.dataTransfer.setData("text/plain", "move");
        // ReactDOM.unmountComponentAtNode(ev.target.parentNode);
    }

    listenDragOver(e) {
        e.preventDefault();
    }

    listenDragEnd(e) {
        e.dataTransfer.effectAllowed = 'move';
        let elmType = e.dataTransfer.getData('text/plain');
        if(elmType==='move') {
            // this.moveElement(e.target, x, y);
            return;
        }
        let {x, y} = this.computeCoordinates(e);
        this.renderElement(e.target, elmType, this.keyMap.getUniqueId(elmType), x, y);
        return false;
    }

    moveElement(event) {
        console.log('moving...')
        let target = event.target;
        let {x, y} = this.computeCoordinates(event);
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        let elmMeta = droppedComponents[target.id];

        let { width, height } = {...componentProps[elmMeta.componentType]};
        // console.log(x, y, width, height, target.name, componentProps[elmMeta.componentType]);
        x -= width/2;
        y -= height/2;

        elmMeta.x = x;
        elmMeta.y = y;
        // let elm = this.getMarkupByType(elmMeta.componentType, event.target.id, elmMeta.x, elmMeta.y);
        let parent = target.parentNode;
        // this.renderElement(target.parentNode, elmMeta.componentType, target.name, elmMeta.x, elmMeta.y);
        this.saveElement(elmMeta.componentType, target.id, elmMeta.x, elmMeta.y);
        let elm = this.getMarkupByType(elmMeta.componentType, target.id, elmMeta.x, elmMeta.y, width, height);
        let map = this.state.componentMarkups;
        map[target.id] = <span id={target.name+"-wrapper"}  key={target.name+"-wrapper"}> {elm} </span>;
        this.setState({
            componentMarkups: map
        });
        ReactDOM.unmountComponentAtNode(parent)
        ReactDOM.render(elm, parent);
    }

    saveElement(type, id, x, y) {
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        droppedComponents[id] = {
            componentType: type,
            x: x,
            y: y
        };
        localStorage.setItem('droppedComponents', JSON.stringify(droppedComponents));
    }

    renderElement(target, type, id, x, y) {
        let { width, height } = {...componentProps[type]};
        this.saveElement(type, id, x, y);
        x -= width/2;
        y -= height/2;
        let elm = this.getMarkupByType(type, id, x, y, width, height);
        let map = this.state.componentMarkups;
        map[id] =   <span id={id+"-wrapper"} key={id+"-wrapper"}>
                        {elm}
                    </span>;
        this.setState({
            componentMarkups: map
        });
        ReactDOM.render(Object.values(this.state.componentMarkups), target);
        // ReactDOM.render(elm, target);
    }

    computeCoordinates(event) {
        let startX, startY, offsetX, offsetY, canvas;
        canvas = document.getElementById('canvas');
        let rect = canvas.getBoundingClientRect();
        startX = rect.x;
        startY = rect.y;
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        return {
            x: offsetX,
            y: offsetY
        };
    }

    clearCanvas() {
        ReactDOM.unmountComponentAtNode(document.getElementById('canvas'));
        localStorage.setItem('droppedComponents', '');
        this.setState({
            componentMarkups: []
        });
        // this.keyMap = new UniqueKeyGenTable();
    }

    render() {
        return (
            <React.Fragment>
                <ul id="toolbar">
                    <li onClick={this.clearCanvas} key="clear">Clear</li>
                    <li key="settings">Settings</li>
                </ul>
                <div className="canvasContainer">
                    <div id="canvas" onDrop={this.listenDragEnd} onDragOver={this.listenDragOver}>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getMarkupByType(type, id, x, y, width, height) {
        let domElm;
        switch (type) {
            case 'input':
                    domElm =    <input type="text" id={id} name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}/>
                    break;
            case 'select':
                    domElm =    <select id={id} name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}>
                                </select>
                    break;
            case 'textarea':
                    domElm =    <textarea id={id} name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}>
                                </textarea>
                    break;
            case 'paragraph':
                domElm =        <p id={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}>
                                    {id}
                                </p>
                break;
            case 'heading':
                domElm =        <h2 id={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}>
                                    {id}
                                </h2>
                break;
            case 'button':
                domElm =        <button id={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y+"px",
                                            width: width+"px", height: height+"px"}}>
                                    {id}
                                </button>
                break;
        }
        return domElm;
    }

    bindEventListeners() {
        this.listenDragOver = this.listenDragOver.bind(this);
        this.listenDragEnd = this.listenDragEnd.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.computeCoordinates = this.computeCoordinates.bind(this);
        this.renderElement = this.renderElement.bind(this);
    }
}

export default DropCanvas;
