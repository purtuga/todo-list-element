import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
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
    :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-family: var(--theme-font-family, Arial);
        font-size: var(--theme-font-size, 16px);
        color: var(--theme-color-fg, black);
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
    textarea:focus {
        border: none;
        outline: none;
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

    // Other instance methods

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