import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import hostStyles from "@purtuga/component-element/src/styles/host.css?inline"
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {
    EachDirective,
    IfDirective,
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
 *
 * @fires TodoList#data-change
 */
@dataBoundTemplates({
    directives: [ EachDirective, IfDirective, PropDirective, AttrDirective, OnDirective ]
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
    @prop data = [];

    /**
     * The message that should be shown when there are no items
     * @type {string}
     */
    @prop({ attr: true }) emptyMsg = "No Items";

    @prop({ attr: true, boolean: true}) noAdd = false;

    @prop({ attr: true, boolean: true}) noEdit = false;

    @prop({ attr: true, boolean: true}) noCheck = false;

    @prop({ attr: true, boolean: true}) noDelete = false;

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
    ${hostStyles}
    :host {
        display: block;
        padding: var(--theme-spacing, 0.5em);
        border: var(--theme-border-light, 1px solid, #ececec);
        box-shadow: var(--them--e-box-shadow-s, 0 8px 10px 1px rgba(0,0,0,0.14));
        border-radius: var(--theme-border-radius, 5px);
    }
    .body {
        min-height: 3em;
    }
    ${todoAddTagName} {
        margin-top: var(--theme-spacing-5, 1em);
    }
</style>
<div class="body">
    <div _if="!props.data.length">{{ props.emptyMsg }}</div>
    <${todoItemTagName}
        _each="(todoData, i) in props.data"
        _attr.no-edit="props.noEdit"
        _attr.no-check="props.noCheck"
        _attr.no-delete="props.noDelete"
        _prop.data="todoData"
        _attr.done="todoData.done"
        _attr.edit="todoData.edit"
        _on.item-edit="todoData.edit = true, _queueUpdate()"
        _on.item-edit-done="_handleEditDone($ev, todoData, i)"
        _on.item-edit-cancel="todoData.edit = false, _queueUpdate()"
        _on.item-delete="_handleDelete($ev, todoData, i)"
        _on.item-check="todoData.done = true, _queueUpdate()"
        _on.item-un-check="todoData.done = false, _queueUpdate()">{{ _isObject(todoData) ? todoData.title : todoData }}</${todoItemTagName}>
</div>
<${todoAddTagName} _if="!props.noAdd" _on.add="_addNew($ev)"></${todoAddTagName}>
`;
    }

    // didRender() {}
    // didUnmount() {}
    // didDestroy() {}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    _isObject(obj) {
        return isObject(obj);
    }

    _addNew(event) {
        const newItem = { title: event.detail };
        this.props.data.push(newItem);
        this._queueUpdate();
        this.emit("data-change");
    }

    _handleEditDone(event, todoData) {
        todoData.edit = false;
        todoData.title = event.detail;
        this._queueUpdate();
        /**
         * @event TodoList#data-change
         */
        this.emit("data-change");
    }

    _handleDelete(event, todoData, i) {
        this.props.data.splice(i, 1);
        this._queueUpdate();
        this.emit("data-change");
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
