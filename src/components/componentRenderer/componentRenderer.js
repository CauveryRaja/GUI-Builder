import React, { Component } from 'react';

import InputComponent from '../input/inputComponent';
import SelectComponent from '../select/selectComponent';
import TextAreaComponent from '../textarea/textareaComponent';
import ParagraphComponent from '../paragraph/paragraphComponent';
import HeadingComponent from '../heading/headingComponent';
import ButtonComponent from '../button/buttonComponent';

class ComponentRenderer extends Component {

    /**
     * Returns React Element based on Component type 
     */
    getComponentByType() {
        let domElm;
        switch (this.props.componentType) {
            case 'input':
                    domElm =    <InputComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </InputComponent>
                    break;
            case 'select':
                    domElm =    <SelectComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </SelectComponent>
                    break;
            case 'textarea':
                    domElm =    <TextAreaComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </TextAreaComponent>
                    break;
            case 'paragraph':
                    domElm =    <ParagraphComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </ParagraphComponent>
                    break;
            case 'heading':
                    domElm =    <HeadingComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </HeadingComponent>
                    break;
            case 'button':
                    domElm =    <ButtonComponent key={this.props.id} id={this.props.id} name={this.props.id}
                                    x={this.props.x} y={this.props.y} width={this.props.width}
                                    height={this.props.height} listenDragStart={this.props.listenDragStart}
                                    moveElement={this.props.moveElement}>
                                </ButtonComponent>
                    break;
            default:
                    domElm = <span>Hello</span>
        }
        return domElm;
    }

    /**
     * Lifecycle method that renders React Elements in DOM
     */
    render() {
        return this.getComponentByType(this.props.componentType);
    }
}

export default ComponentRenderer;
