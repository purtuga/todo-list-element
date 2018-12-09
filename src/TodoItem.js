import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import {Icon} from "@purtuga/common-widget-elements/src/Icon/Icon.js";
import {
    AttrDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";
import {TodoInput} from "./TodoInput.js";

//=============================================================

Icon.define();

/**
 * Display a TodoItem
 *
 * @extends ComponentElement
 *
 * @fires TodoItem#check
 * @fires TodoItem#un-check
 * @fires TodoItem#edit
 */
@dataBoundTemplates({
    directives: [
        AttrDirective,
        OnDirective
    ]
})
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

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
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
        border: var(--theme-border, 1px solid lighgrey);
        margin-bottom: var(--theme-spacing-1, 0.2em);
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
    .clickable {
        cursor: pointer;
    }
</style>
<div class="content"
    _class="{ 'done': props.done }">
    <span class="clickable" _on.click="emit(props.done ? 'un-check' : 'check', props.data)">
        <i-con _attr.from="props.iconSource" _attr.name="props.done ? props.iconDoneName : props.iconNotDoneName"></i-con>
    </span>
    <span class="description"
        _attr.title="props.tooltipEdit"
        _on.click="emit('edit')"
    ><slot></slot></span>
    <span class="clickable">
        <i-con _attr.from="props.iconSource" _attr.name="props.iconTrashName"></i-con>
    </span>
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
export {
    TodoItem
}