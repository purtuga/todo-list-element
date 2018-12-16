import {showcase} from "@purtuga/project-showcase/src/index.js";
import {render, allDirectives} from "@purtuga/dom-data-bind/src/index.js";

//==============================================================

showcase({name: "Events", group: "Todo List"},function ($cntr) {
    $cntr.style.padding = "0 0 5em";
    let count = 1;

    $cntr.appendChild(
        render(
            `
<div 
    style="display: flex;"
    _on.data-change="log"
    _on.item-check="log"
    _on.item-un-check="log"
    _on.item-edit="log"
    _on.item-edit-done="log"
    _on.item-edit-cancel="log"
    _on.item-delete="log"
    >
    <div style="width: 50%;">
        <todo-list _prop.data="items"></todo-list>
    </div>
    <div id="log" style="box-sizing: border-box;width: 47%;margin-left: 1%; height: ${ window.innerHeight - 200 }px; overflow: auto"><div></div></div>
</div>
`,
            {
                items: [
                    { title: "Task 1", done: true },
                    { title: "Task 2", done: false }
                ],
                log(event) {
                    const $logOutput = this.querySelector("#log");
                    const $newLogEntry = document.createElement("div");
                    $newLogEntry.setAttribute("style", "box-sizing: border-box;border: var(--theme-border, 1px solid lightgrey); margin-bottom: 2em;padding: 1em; width: 100%;");
                    $newLogEntry.innerHTML = `
<div>EVENT ${ count++ }: ${event.type}</div>
<div>EVENT Details: </div>
<div style="white-space: pre-wrap;"><code>${JSON.stringify(event.detail, null, 4)}</code></div>
`;
                    $logOutput.insertBefore($newLogEntry, $logOutput.firstChild);
                }
            },
            allDirectives
        )
    );



    showcase({name: "Events when in readonly", group: "Todo List"},function ($cntr) {
        $cntr.style.padding = "0 0 5em";
        let count = 1;

        $cntr.appendChild(
            render(
                `
<div 
    style="display: flex;"
    _on.click="log"
    _on.item-data-change="log"
    _on.item-check="log"
    _on.item-un-check="log"
    _on.item-edit="log"
    _on.item-edit-done="log"
    _on.item-edit-cancel="log"
    _on.item-delete="log"
    >
    <div style="width: 50%;">
        <todo-list _prop.data="items" no-add no-edit no-check no-delete></todo-list>
    </div>
    <div id="log" style="box-sizing: border-box;width: 47%;margin-left: 1%; height: ${window.innerHeight - 200}px; overflow: auto"><div></div></div>
</div>
`,
                {
                    items: [
                        {title: "Task 1", done: true},
                        {title: "Task 2", done: false}
                    ],
                    log(event) {
                        const $logOutput = this.querySelector("#log");
                        const $newLogEntry = document.createElement("div");
                        $newLogEntry.setAttribute("style", "box-sizing: border-box;border: var(--theme-border, 1px solid lightgrey); margin-bottom: 2em;padding: 1em; width: 95%;");
                        $newLogEntry.innerHTML = `
<div>EVENT ${count++}: ${event.type}</div>
<div>EVENT Details: </div>
<div style="white-space: pre-wrap;"><code>${JSON.stringify(event.detail, null, 4)}</code></div>
`;
                        $logOutput.insertBefore($newLogEntry, $logOutput.firstChild);
                    }
                },
                allDirectives
            )
        );
    });

});
