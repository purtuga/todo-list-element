import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {
    EachDirective,
    PropDirective,
    AttrDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {isObject} from "@purtuga/common/src/jsutils/runtime-aliases.js";

import {TodoItem} from "./TodoItem.js";
import {TodoAdd} from "./TodoAdd.js";

//=============================================================

/**
 * A container that displays a set of todo items.
 *
 * __Supported CSS Vars__
 *
 * TODO: document css vars
 *
 * @extends ComponentElement
 */
@dataBoundTemplates({
    directives: [ EachDirective, PropDirective, AttrDirective, OnDirective ]
})
class TodoList extends ComponentElement {
    //-------------------------------------------------------------
    //
    //                                              STATIC MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC PROPERTIES ~~~~~
    static tagName = "todo-list";

    /**
     * The Constructor (`CustomElement`) for each individual todo item
     * @type {TodoItem}
     */
    static TodoItem = TodoItem;

    /**
     * The Todo Add area Constructor (`CustomElement)
     * @type {TodoAdd}
     */
    static TodoAdd = TodoAdd;

    // static get delayDestroy() {}
    // static get useShadow() {}
    // static get shadowMode() {}
    // static getEventInitOptions(){}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC METHODS ~~~~~

    static define(name) {
        super.define(name);
        this.TodoAdd.define();
        this.TodoItem.define();
    }


    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  PROPS AND ATTRIBUTES  ~~~~

    /**
     * The list of todo items. By default, it support an array of strings or
     * array of objects, with each object having at least a `title` attribute
     * @type {Array<String|Object>}
     */
    @prop
    data = [];


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
    // didMount(){}
    // willRender(){ }

    render() {
        // this._renderDone = true;

        const {
            TodoItem: { tagName: todoItemTagName },
            TodoAdd: { tagName: todoAddTagName }
        } = this.constructor;

        return `
<style>
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-family: var(--theme-font-family, "Arial");
        color: var(--theme-color-fg, "black");
    }
</style>
<div>
    <${ todoItemTagName }
        _each="todoData in props.data"
        _prop.data="todoData"
        _attr.done="todoData.done"
        _attr.edit="todoData.edit"
        _on.edit="todoData.edit = true, _queueUpdate()"
        _on.edit-done="todoData.edit = false, todoData.title = $ev.detail, _queueUpdate()"
        _on.edit-cancel="todoData.edit = false, _queueUpdate()"
        _on.check="todoData.done = true, _queueUpdate()"
        _on.un-check="todoData.done = false, _queueUpdate()">{{ _isObject(todoData) ? todoData.title : todoData }}</${ todoItemTagName }>
</div>
<${ todoAddTagName }></${ todoAddTagName }>
`;
    }

    // didRender() {}
    // didUnmount() {}
    // didDestroy() {}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    _isObject(obj) {
        return isObject(obj);
    }

}

//-------------------------------------------------------------
//
//                                       CLASS PRIVATE MEMBERS
//
//-------------------------------------------------------------


//------------------------------------------ OTHER EXPORTS ----
export default TodoList;
export {
    TodoList,
    TodoItem,
    TodoAdd
}
