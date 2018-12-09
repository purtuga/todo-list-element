import {ComponentElement, prop} from "@purtuga/component-element/src/index.js"
import {
    PropDirective,
    OnDirective
} from "@purtuga/dom-data-bind/src/index.js";
import {dataBoundTemplates} from "@purtuga/dom-data-bind/src/ElementDecorator.js";

//=============================================================

/**
 * The Todo item Input area (a textarea)
 * @extends ComponentElement
 */
@dataBoundTemplates({
    directives: [PropDirective, OnDirective]
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
    }
</style>
<textarea _prop.value="props.value" _on.input="emit('change', this.value)"></textarea>`;
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