import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './canvas.scss';

import UniqueKeyGenMap from '../../models/keyMap';
import componentProps from '../../config/componentProps';

import ComponentRenderer from '../componentRenderer/componentRenderer';
import CanvasToolbar from '../canvasToolbar/canvasToolbar';

class DropCanvas extends Component {

    constructor() {
        super();
        this.state = {
            componentsMarkup: {},
            componentsMetaInfo: {}
        };
        this.keyMap = new UniqueKeyGenMap();
        this.bindEventListeners();
    }

    componentDidMount() {
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        this.setState({
            componentsMetaInfo: droppedComponents
        })
        let target = document.getElementById('canvas');
        let componentIds = Object.keys(droppedComponents);
        componentIds.forEach((id, i) => {
            let item = droppedComponents[id];
            this.renderElement(target, item.componentType, id, item.x, item.y);
        });
    }

    listenDragStart(ev) {
        ev.dataTransfer.setData("text/plain", "move");
    }

    listenDragOver(e) {
        e.preventDefault();
    }

    listenDragEnd(e) {
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        let elmType = e.dataTransfer.getData('text/plain');
        if(elmType==='move') {
            // this.moveElement(e.target, x, y);
            return;
        }
        let {x, y} = this.computeCoordinates(e);
        this.renderElement(e.target, elmType, this.keyMap.getUniqueId(elmType), x, y, true);
        return false;
    }

    moveElement(event) {
        event.preventDefault();
        let target = event.target;
        let {x, y} = this.computeCoordinates(event);
        this.renderElement(document.getElementById('canvas'),
                            this.state.componentsMetaInfo[target.id].componentType, target.id, x, y, true);
    }

    saveElement(type, id, x, y) {
        let droppedComponents = localStorage.getItem('droppedComponents');
        droppedComponents = !droppedComponents ? {} : JSON.parse(droppedComponents);
        let { width, height } = {...componentProps[type]};
        x -= width/2;
        y -= height/2;
        droppedComponents[id] = {
            componentType: type,
            x: x,
            y: y
        };
        localStorage.setItem('droppedComponents', JSON.stringify(droppedComponents));
        this.setState({
            componentsMetaInfo: droppedComponents
        });
    }

    renderElement(target, type, id, x, y, save) {
        let { width, height } = {...componentProps[type]};
        if(save)
            this.saveElement(type, id, x, y);
        this.setState((state, props) => {
            let elm =   <ComponentRenderer id={id} key={id}
                            componentType={type}
                            x={state.componentsMetaInfo[id].x}
                            y={state.componentsMetaInfo[id].y}
                            width={width} height={height}
                            listenDragStart={this.listenDragStart}
                            moveElement={this.moveElement}>
                        </ComponentRenderer>
            let map = state.componentsMarkup;
            map[id] = elm;
            ReactDOM.render(<React.Fragment>{Object.values(map)}</React.Fragment>, target);
            return {
                ...state,
                componentsMarkup: map
            }
        });
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

    computeOverlappingRegion(type, id, x, y) {
        let componentIds = Object.keys(this.state.componentsMetaInfo);
        let offset = {
            x: 0,
            y: 0
        };
        for(let i=0; i<componentIds.length; i++) {
            let item = this.state.componentsMetaInfo[componentIds[i]];
            let {width, height} = {...componentProps[item.componentType]};
            if(item.x<=x && x<=item.x+width) {
                if(item.y<=y && y<=item.y+height) {
                    offset['x'] = item.x+width - x;
                    offset['y'] = item.y+height - y;
                    break;
                }
            }
        }
        console.log(offset);
        return offset;
    }

    clearCanvas() {
        ReactDOM.unmountComponentAtNode(document.getElementById('canvas'));
        localStorage.setItem('droppedComponents', '');
        this.setState({
            componentsMarkup: {},
            componentsMetaInfo: {}
        });
        this.keyMap.initMap();
    }

    render() {
        return (
            <React.Fragment>
                <CanvasToolbar clearCanvas={this.clearCanvas}></CanvasToolbar>
                <div className="canvasContainer">
                    <div id="canvas" onDrop={this.listenDragEnd} onDragOver={this.listenDragOver}>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    bindEventListeners() {
        this.listenDragOver = this.listenDragOver.bind(this);
        this.listenDragEnd = this.listenDragEnd.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.computeCoordinates = this.computeCoordinates.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.saveElement = this.saveElement.bind(this);
    }
}

export default DropCanvas;
