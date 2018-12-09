import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import {TodoInput} from "./TodoInput.js";

//=============================================================

/**
 *
 * @extends ComponentElement
 */
export class TodoItem extends ComponentElement {
    //-------------------------------------------------------------
    //
    //                                              STATIC MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC PROPERTIES ~~~~~
    static tagName = "todo-item";

    /**
     * The Input widget that will be used to collect user data
     * @type {TodoInput}
     */
    static TodoInput = TodoInput;


    // static get delayDestroy() {}
    // static get useShadow() {}
    // static get shadowMode() {}
    // static getEventInitOptions(){}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC METHODS ~~~~~

    static define(name) {
        super.define(name);
        this.TodoInput.define();
    }

    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  PROPS AND ATTRIBUTES  ~~~~

    // FIXME: implement readonly
    @prop({ attr: true })
    readonly = false;


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
    // didMount(){}
    willRender(){
        return this._renderDone;
    }

    render() {
        this._renderDone = true;
        return `
<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-family: var(--theme-font-family, Arial);
        color: var(--theme-color-fg, black);
        padding: var(--theme-spacing-2, 0.5em);
        border: var(--theme-border, 1px solid lighgrey);
        margin-bottom: var(--theme-spacing-1, 0.2em);
    }
    :host(:last-child) {
        margin-bottom: 0;
    }
    
</style>
<div _class="{ 'done': data.done }">
    <i class="icon"
       _on.click="console.log('click icon not done yet')"
    ></i>
    <span class="title"
        _attr.title="props.tooltip"
        _on.click="edit(item)"
    ><slot>{{ data.title }}</slot></span>
    <span>Actions here</span>
</div>
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


export default TodoItem;
