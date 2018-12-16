import {ComponentElement} from "@purtuga/component-element/src/index.js"
import hostStyles from "@purtuga/component-element/src/styles/host.css?inline"

//=============================================================

/**
 * Wraps an action. Action is initially faded and then emphasized on hover
 * @extends ComponentElement
 * @property {String} [invisible]
 *  Only as HTML Attribute. Makes action hidden and only visible on hover.
 */
class TodoAction extends ComponentElement {
    //-------------------------------------------------------------
    //
    //                                              STATIC MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC PROPERTIES ~~~~~
    static tagName = "todo-action";

    // static get delayDestroy() {}
    // static get useShadow() {}
    // static get shadowMode() {}
    // static getEventInitOptions(){}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC METHODS ~~~~~

    // static define(name) {}


    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  PROPS AND ATTRIBUTES  ~~~~


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
    // didMount(){}
    // willRender(){}

    render() {
        return `
<style>
    ${ hostStyles }
    :host {
        fill: var(--theme-color-3, lightgrey);
        color: var(--theme-color-3, lightgrey);
        transition: all 0.3s;
        cursor: pointer;
    }
    :host([invisible]) {
        opacity: 0;
    } 
    :host(:hover) {
        fill: var(--theme-color-7, darkgrey);
        color: var(--theme-color-7, darkgrey);
        opacity: 1;
    }
</style>
<slot></slot>
`;
    }

    // didRender() {}
    // didUnmount() {}
    // didDestroy() {}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    // Other instance methods

}

//-------------------------------------------------------------
//
//                                       CLASS PRIVATE MEMBERS
//
//-------------------------------------------------------------

// Private functions here...

//------------------------------------------ EXPORTS ----------
export default TodoAction;
export {
    TodoAction
}
