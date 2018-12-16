import {showcase} from "@purtuga/project-showcase/src/index.js";
import {render, allDirectives} from "@purtuga/dom-data-bind/src/index.js";

//==============================================================

showcase({name: "Prop Options", group: "Todo List"},function ($cntr) {
    $cntr.style.padding = "0 0 5em";

    $cntr.appendChild(
        render(
            `
<h2><code>no-add</code> option</h2>
<todo-list _prop.data="items" no-add></todo-list>`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ]
            },
            allDirectives
        )
    );

    $cntr.appendChild(
        render(
            `
<hr style="margin: 2em 0">
<h2><code>no-edit</code> Option</h2>
<todo-list _prop.data="items" no-edit></todo-list>`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ]
            },
            allDirectives
        )
    );

    $cntr.appendChild(
        render(
            `
<hr style="margin: 2em 0">
<h2><code>no-check</code> Option</h2>
<todo-list _prop.data="items" no-check></todo-list>`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ]
            },
            allDirectives
        )
    );

    $cntr.appendChild(
        render(
            `
<hr style="margin: 2em 0">
<h2><code>no-delete</code> Option</h2>
<todo-list _prop.data="items" no-delete></todo-list>`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ]
            },
            allDirectives
        )
    );

    $cntr.appendChild(
        render(
            `
<hr style="margin: 2em 0">
<h2>Readonly <code>no-add, no-edit, no-check, no-delete</code> Option</h2>
<todo-list _prop.data="items" no-add no-edit no-check no-delete></todo-list>`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ]
            },
            allDirectives
        )
    );

});
