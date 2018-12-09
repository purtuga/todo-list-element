import {showcase} from "@purtuga/project-showcase";
import {render, allDirectives} from "@purtuga/dom-data-bind/src";

//==============================================================

showcase("Basic Todo", function ($cntr) {
    $cntr.appendChild(
        render(
            `<todo-list _prop.data="items"></todo-list>`,
            {
                items: [
                    { title: "Task 1" },
                    "task 2 (string)"
                ]
            },
            allDirectives
        )
    );
});
