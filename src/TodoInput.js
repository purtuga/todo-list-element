import {ComponentElement, prop} from "@purtuga/component-element/src/index.js";
import hostStyles from "@purtuga/component-element/src/styles/host.toString.css";
import {
    PropDirective,
    AttrDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";

//=============================================================

/**
 * The Todo item Input area (a textarea)
 * @extends ComponentElement
 * @fires TodoInput#change
 */
@dataBoundTemplates({
    directives: [PropDirective, AttrDirective, OnDirective]
})
class TodoInput extends ComponentElement {
    //-------------------------------------------------------------
    //
    //                                              STATIC MEMBERS
    //
    //-------------------------------------------------------------

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STATIC PROPERTIES ~~~~~
    static tagName = "todo-input";

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

    @prop()
    value = "";

    @prop({ attr: true })
    placeholder = "Enter value...";

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  LIFE CYCLE HOOKS  ~~~~~

    // didInit(){}
    // didMount(){}
    // willRender(){}

    render() {
        return `
<style>
    ${ hostStyles }
    :host {
        display: block;
        min-height: 1.5em;
        border: var(--theme-border-light, 1px solid #eeeeee);
    }
    :host(:focus-within) {
        border: var(--theme-border, 1px solid lightgrey);
    }
    input {
        font-size: var(--theme-font-size, 16px);
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
        outline: none;
        padding: var(--theme-spacing-3, 0.5em);
    }
</style>
<input
    type="text"
    _prop.value="props.value"
    _on.input="emit('change', $ev.target.value)"
    _attr.placeholder="props.placeholder" />
`;
    }

    // didRender() {}
    // didUnmount() {}
    // didDestroy() {}

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  INSTANCE METHODS  ~~~~

    focus() {
        this.$("input").focus();
    }

}

//-------------------------------------------------------------
//
//                                       CLASS PRIVATE MEMBERS
//
//-------------------------------------------------------------


export default TodoInput;
export {
    TodoInput
}