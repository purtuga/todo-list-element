import {ComponentElement, prop, bind} from "@purtuga/component-element/src/index.js"
import hostStyles from "@purtuga/component-element/src/styles/host.toString.css"
import {Icon} from "@purtuga/common-widget-elements/src/Icon/Icon.js";
import {ConfirmAction} from "@purtuga/common-widget-elements/src/ConfirmAction/ConfirmAction.js";
import {
    AttrDirective,
    PropDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {view} from "@purtuga/dom-data-bind/src/index.js";
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {domAddEventListener} from "@purtuga/common/src/domutils/domAddEventListener.js";
import {doc} from "@purtuga/common/src/jsutils/runtime-aliases.js";
import showOnHoverStyles from "./styles/show-on-hover.toString.css";
import {TodoInput} from "./TodoInput.js";
import {TodoAction} from "./TodoAction.js";

//=============================================================
const directives = [
    AttrDirective,
    PropDirective,
    OnDirective
];
ConfirmAction.define();
Icon.define();

/**
 * Display a TodoItem
 *
 * @extends ComponentElement
 *
 * @fires TodoItem#check
 * @fires TodoItem#un-check
 * @fires TodoItem#edit
 * @fires TodoItem#edit-done
 * @fires TodoItem#edit-cancel
 * @fires TodoItem#delete
 */
@dataBoundTemplates({ directives })
class TodoItem extends ComponentElement {
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

    /**
     * The View Template for showing a Todo Item
     * @type {Template}
     */
    static displayView = view(`
<todo-action _on.click="emit(props.done ? 'un-check' : 'check', props.data)">
    <i-con
        class="checkmark"
        _attr.from="props.iconSource" 
        _attr.name="props.done ? props.iconDoneName : props.iconNotDoneName"></i-con>
</todo-action>
<span class="description" _attr.title="props.tooltipEdit" _on.click="emit('edit')">
    <slot></slot>
</span>
<confirm-action confirm-align-right _on.confirmed="emit('delete')" class="show-on-hover">
    <todo-action>
        <i-con _attr.from="props.iconSource" _attr.name="props.iconTrashName"></i-con>
    </todo-action>
    <span slot="message">{{ props.confirmText }}</span>
    <span slot="cancel">{{ props.confirmCancelText }}</span>
    <span slot="confirm">{{ props.confirmProceedText }}</span>
</confirm-action>
`, directives);


    /**
     * The View Template for Editing a Todo Item
     * @type {Template}
     */
    static editView = view(`
<span class="description">
    <${ this.TodoInput.tagName } 
        _prop.value="_getDescription()"
        _on.change="_storeNewDescription($ev)"
        _on.keyup.enter="_emitSave()"></${this.TodoInput.tagName}>
</span>
<todo-action _on.click="_emitSave()">
    <i-con _attr.from="props.iconSource" _attr.name="props.iconSaveName"></i-con>
</todo-action>
<todo-action _on.click="_emitCancel()">
    <i-con _attr.from="props.iconSource" _attr.name="props.iconCancelName"></i-con>
</todo-action>
`, directives);

    // static get delayDestroy() {}
    // static get useShadow() {}
    // static get shadowMode() {}
    // static getEventInitOptions(){}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC METHODS ~~~~~

    static define(name) {
        super.define(name);
        this.TodoInput.define();
        TodoAction.define(); // TODO: should it be exposed as class static?
    }

    //-------------------------------------------------------------
    //
    //                                            INSTANCE MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  PROPS AND ATTRIBUTES  ~~~~

    @prop
    data = null;

    @prop({ attr: true }) // FIXME: implement readonly
    readonly = false;

    @prop({ boolean: true }) // FIXME: implement readonly
    edit = false;

    @prop({ boolean: true })
    done = false;

    @prop({ attr: true })
    tooltipEdit = "Click to Edit";

    @prop({ attr: true })
    confirmText = "Remove Item?";

    @prop({ attr: true })
    confirmCancelText = "No";

    @prop({ attr: true })
    confirmProceedText = "Yes";

    @prop({ attr: true })
    iconSource = "boxicons";

    @prop({ attr: true })
    iconDoneName = "check-circle";

    @prop({ attr: true })
    iconNotDoneName = "circle";

    @prop({ attr: true })
    iconTrashName = "trash";

    @prop({ attr: true })
    iconSaveName = "save";

    @prop({ attr: true })
    iconCancelName = "reset";

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    didInit(){
        this._docEv = null;
        this._id = Symbol("todoitem");
        this._newDescription = "";
    }

    // didMount(){}
    // willRender(){}

    render() {
        return `
<style>
    ${ hostStyles }
    :host {
        display: block;
        padding: var(--theme-spacing-2, 0.5em);
        border: var(--theme-border-light, 1px solid lightgrey);
        border-radius: var(--theme-border-radius, 6px);
        margin-bottom: var(--theme-spacing-1, 0.2em);
        transition: border 0.5s;
    }
    :host(:last-child) {
        margin-bottom: 0;
    }
    ${ showOnHoverStyles }
    .content {
        display: flex;
    }
    .description {
        flex: auto;
        flex-wrap: wrap;
        padding: 0 var(--theme-spacing-3, 1em);
    }
    :host([done]) .description {
        text-decoration: line-through;
    }
    :host([done]:hover) .description {
        text-decoration: none;
    }
    .clickable {
        cursor: pointer;
    }
    :host(:hover) {
        border-color: var(--theme-border-color, grey);
    }
    :host([done]) i-con.checkmark {
        fill: var(--theme-color-accent-success-4, green);
        color: var(--theme-color-accent-success-4, green);
    }
</style>
<div class="content"
    _on.click="$ev[_id] = this">
    {{ _getView() }}
</div>
`;
    }

    // didRender() {}
    // didUnmount() {}
    didDestroy() {
        this._removeDocEv();
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    _getView() {
        this._newDescription = this._getDescription();

        if (!this.props.edit) {
            this._removeDocEv();
            return this.constructor.displayView;
        }

        setTimeout(this._setupDocEv, 200);
        return this.constructor.editView;
    }

    @bind
    _setupDocEv() {
        if (!this._docEv && this.props.edit) {
            this.$(this.constructor.TodoInput.tagName).focus();

            // FIXME: documetn this event
            this._docEv = domAddEventListener(doc, "click", event => {
                if (!event[this._id] || !this.$ui.contains(event[this._id])) {
                    this._emitSave();
                }
            });
        }
    }

    _removeDocEv() {
        if (this._docEv) {
            this._docEv.remove();
            this._docEv = null;
        }
    }

    _getDescription() {
        return this.textContent;
    }

    _storeNewDescription(event) {
        this._newDescription = event.detail;
    }

    _emitSave() {
        this.emit("edit-done", this._newDescription);
        this._removeDocEv();
    }

    _emitCancel() {
        this.emit("edit-cancel");
        this._removeDocEv();
    }
}

//-------------------------------------------------------------
//
//                                       CLASS PRIVATE MEMBERS
//
//-------------------------------------------------------------


export default TodoItem;
export {
    TodoItem
}