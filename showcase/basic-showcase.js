import {showcase} from "@purtuga/project-showcase";
import {render, allDirectives} from "@purtuga/dom-data-bind/src";

//==============================================================

showcase({name: "Basic Todo", group: "Todo List"}, function ($cntr) {
    $cntr.appendChild(
        render(
            `
<h2>Default Options</h2>
<todo-list _prop.data="items"></todo-list>`,
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
<hr style="margin: 5em 0">
<h2>Style definitions</h2>
<p>No box-shadow + custom empty message</p>
<todo-list _prop.data="items" style="box-shadow: none" empty-msg="There are no items here. Add a new one below."></todo-list>`,
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
