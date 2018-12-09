import {ComponentElement, prop, bind} from "@purtuga/component-element/src/index.js"
import {Icon} from "@purtuga/common-widget-elements/src/Icon/Icon.js";
import {
    AttrDirective,
    PropDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {view} from "@purtuga/dom-data-bind/src/index.js";
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {domAddEventListener} from "@purtuga/common/src/domutils/domAddEventListener.js";
import {doc} from "@purtuga/common/src/jsutils/runtime-aliases.js";
import {TodoInput} from "./TodoInput.js";

//=============================================================
const directives = [
    AttrDirective,
    PropDirective,
    OnDirective
];
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


    static displayView = view(`
<span 
    class="clickable" 
    _on.click="emit(props.done ? 'un-check' : 'check', props.data)">
    <i-con 
        class="checkmark"
        _attr.from="props.iconSource" 
        _attr.name="props.done ? props.iconDoneName : props.iconNotDoneName""></i-con>
</span>
<span class="description"
    _attr.title="props.tooltipEdit"
    _on.click="emit('edit')"
><slot></slot></span>
<span class="clickable">
    <i-con _attr.from="props.iconSource" _attr.name="props.iconTrashName"></i-con>
</span>`, directives);


    static editView = view(`
<span class="description">
    <${ this.TodoInput.tagName } 
        _prop.value="_getDescription()"
        _on.change="_storeNewDescription($ev)"></${this.TodoInput.tagName}>
</span>
<span>
    <span>
        <i-con 
            _attr.from="props.iconSource" 
            _attr.name="props.iconSaveName"
            _on.click="_emitSave()"></i-con>
        <i-con 
            _attr.from="props.iconSource" 
            _attr.name="props.iconCancelName"
            _on.click="_emitCancel()"></i-con>
    </span>
</span>
`, directives);

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
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-family: var(--theme-font-family, Arial);
        color: var(--theme-color-fg, black);
        padding: var(--theme-spacing-2, 0.5em);
        border: var(--theme-border-light, 1px solid lightgrey);
        border-radius: var(--theme-border-radius, 6px);
        margin-bottom: var(--theme-spacing-1, 0.2em);
        
        transition: border 0.5s;
    }
    :host(:hover) {
        border-color: var(--theme-border-color, grey);
    }
    :host(:last-child) {
        margin-bottom: 0;
    }
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

    i-con {
        fill: var(--theme-color-3, lightgrey);
        color: var(--theme-color-3, lightgrey);
        transition: color 0.3s, fill 0.3s;
    }
    :host([done]) i-con.checkmark {
        fill: var(--theme-color-accent-success-4, green);
        color: var(--theme-color-accent-success-4, green);
    }
    :host(:not([done]):hover) i-con {
        fill: var(--theme-color-7, darkgrey);
        color: var(--theme-color-7, darkgrey);
    }

</style>
<div class="content"
    _class="{ 'done': props.done }"
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