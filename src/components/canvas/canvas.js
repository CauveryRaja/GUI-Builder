import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './canvas.scss';
import UniqueKeyGenTable from '../../models/key-table';

class DropCanvas extends Component {
    state = {
        componentMarkups: {},
        componentProps: {
            width: 100,
            height: 100
        }
    };

    constructor() {
        super();
        this.keyMap = new UniqueKeyGenTable();
        this.listenDragOver = this.listenDragOver.bind(this);
        this.listenDragEnd = this.listenDragEnd.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.computeCoordinates = this.computeCoordinates.bind(this);
        this.renderElement = this.renderElement.bind(this);
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
        console.log("dragStart", ev.target, ev.target.parentNode);
        ev.dataTransfer.setData("text/plain", "move");
        // ReactDOM.unmountComponentAtNode(ev.target.parentNode);
    }

    listenDragOver(e) {
        e.preventDefault();
        console.log('On Drag Over');
    }

    listenDragEnd(e) {
        e.dataTransfer.effectAllowed = 'move';
        let elmType = e.dataTransfer.getData('text/plain');
        if(elmType==='move') {
            // this.moveElement(e.target, x, y);
            return;
        }
        let {x, y} = this.computeCoordinates(e);
        console.log(x, y);
        this.renderElement(e.target, elmType, this.keyMap.getUniqueId(elmType), x, y);
        return false;
    }

    moveElement(event) {
        let target = event.target;
        console.log(target, target.parentNode);
        let {x, y} = this.computeCoordinates(event);
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        let elmMeta = droppedComponents[event.target.name];
        elmMeta.x = x;
        elmMeta.y = y;
        // let elm = this.getMarkupByType(elmMeta.componentType, event.target.id, elmMeta.x, elmMeta.y);
        let parent = target.parentNode;
        // this.renderElement(target.parentNode, elmMeta.componentType, target.name, elmMeta.x, elmMeta.y);
        this.saveElement(elmMeta.componentType, target.name, elmMeta.x, elmMeta.y);
        let elm = this.getMarkupByType(elmMeta.componentType, target.name, elmMeta.x, elmMeta.y);
        let map = this.state.componentMarkups;
        map[target.name] = <span id={target.name+"-wrapper"}> {elm} </span>;
        this.setState({
            componentMarkups: map
        });
        console.log(parent);
        ReactDOM.unmountComponentAtNode(parent);
        ReactDOM.render(elm, parent);
    }

    // saveElement(type, x, y) {
    //     let droppedComponents = localStorage.getItem('droppedComponents');
    //     console.log(droppedComponents);
    //     droppedComponents = !droppedComponents ? [] : JSON.parse(droppedComponents);
    //     console.log(droppedComponents);
    //     droppedComponents.push({
    //         componentType: type,
    //         x: x,
    //         y: y
    //     });
    //     localStorage.setItem('droppedComponents', JSON.stringify(droppedComponents));
    // }

    saveElement(type, id, x, y) {
        let droppedComponents = localStorage.getItem('droppedComponents');
        console.log(droppedComponents);
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        console.log(droppedComponents);
        droppedComponents[id] = {
            componentType: type,
            x: x,
            y: y
        };
        localStorage.setItem('droppedComponents', JSON.stringify(droppedComponents));
    }

    renderElement(target, type, id, x, y) {
        // let elmStr = this.getElementByType(type, x, y);
        // target.insertAdjacentHTML('beforeEnd', elmStr);

        this.saveElement(type, id, x, y);
        let elm = this.getMarkupByType(type, id, x, y);
        console.log(elm);
        console.log(elm.props.style);
        let map = this.state.componentMarkups;
        map[id] =   <span id={id+"-wrapper"}>
                        {elm}
                    </span>;
        this.setState({
            componentMarkups: map
        });
        console.log('Calling dom render', this.state.componentMarkups , Object.values(this.state.componentMarkups));
        ReactDOM.render(<React.Fragment>{Object.values(this.state.componentMarkups)}</React.Fragment>, target);
    }

    computeCoordinates(event) {
        let startX, startY, offsetX, offsetY, canvas;
        canvas = document.getElementById('canvas');
        let rect = canvas.getBoundingClientRect();
        startX = rect.x;
        startY = rect.y;
        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        console.log(event, startX, startY, offsetX, offsetY);
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
        this.keyMap = new UniqueKeyGenTable();
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

    getMarkupByType(type, id, x, y) {
        let domElm;
        switch (type) {
            case 'input':
                    domElm =    <input type="text" name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}/>
                    break;
            case 'select':
                    domElm =    <select name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}>
                                </select>
                    break;
            case 'textarea':
                    domElm =    <textarea name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}>
                                </textarea>
                    break;
            case 'paragraph':
                domElm =        <p name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}>
                                    paragraph-0
                                </p>
                break;
            case 'heading':
                domElm =        <h2 name={id} onDragStart={this.listenDragStart}
                                    onDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}>
                                    heading-0
                                </h2>
                break;
            case 'button':
                domElm =        <button name={id} onDragStart={this.listenDragStart}
                                    oonDragEnd={this.moveElement} draggable
                                    style={{position:"absolute", left:x+"px", top:y + "px"}}>
                                    button-0
                                </button>
                break;
        }
        return domElm;
    }
}

export default DropCanvas;
