import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import hostStyles from "@purtuga/component-element/src/styles/host.toString.css"
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {OnDirective, PropDirective} from "@purtuga/dom-data-bind/src/index.js";
import {TodoInput} from "./TodoInput.js";
import {TodoAction} from "./TodoAction.js";
import showOnHoverStyles from "./styles/show-on-hover.toString.css"

//=============================================================

/**
 *
 * @extends ComponentElement
 */
@dataBoundTemplates({
    directives: [PropDirective, OnDirective]
})
class TodoAdd extends ComponentElement {
    //-------------------------------------------------------------
    //
    //                                              STATIC MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC PROPERTIES ~~~~~
    static tagName = "todo-add";

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
        TodoAction.define(); // TODO: should TodoAction be exposed as Static prop
    }


    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  PROPS AND ATTRIBUTES  ~~~~

    @prop() value = "";

    @prop() placeholder="";

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
    // didMount(){}
    // willRender(){}

    render() {
        const todoInputTagName = this.constructor.TodoInput.tagName;

        return `
<style>
    ${ hostStyles }
    :host {
        display: block;
        border: var(--theme-border-light, 1px solid lightgrey);
        border-radius: var(--theme-border-radius, 6px);
        overflow: hidden;
    }
    ${ showOnHoverStyles }
    div {
        display: flex;
    }
    ${todoInputTagName} {
        margin: var(--theme-spacing-1, 0.2em);
        flex: auto;
        border: none;
    }
    todo-action {
        padding: 0 var(--theme-spacing-2, 0.5em);
        display: flex;
        align-items: center;
    }
</style>
<div>
    <${ todoInputTagName }
        _on.change="_handleNewValue($ev)"
        _on.keyup.enter="_handleAdd()"
        _on.keyup.esc="props.value = ''"
        _prop.placeholder="props.placeholder"
        _prop.value="value"></${ todoInputTagName }>
    <todo-action _on.click="_handleAdd()" class="show-on-hover">
        <i-con from="boxicons" name="plus-circle">Add</i-con>
    </todo-action>
</div>
`;
    }

    // didRender() {}
    // didUnmount() {}
    // didDestroy() {}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    _handleNewValue(ev) {
        this.value = ev.detail;
    }

    _handleAdd() {
        this.value = this.value ? this.value.trim() : "";

        if (this.value) {
            this.emit("add", this.value);
            this.value = "";
            this._queueUpdate();
            this.focus();
        }
    }

    focus() {
        this.$(this.constructor.TodoInput.tagName).focus();
    }
}

//-------------------------------------------------------------
//
//                                       CLASS PRIVATE MEMBERS
//
//-------------------------------------------------------------


export default TodoAdd;
export {
    TodoAdd
}