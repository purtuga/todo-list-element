import {showcase, registerElements} from "@purtuga/project-showcase";
import "../src/import.js"

// import other showcases now so that they register themselves.
import "./basic.js"

//========================================================
registerElements();


showcase("About", function ($content) {
    $content.innerHTML = `
<h2>todo-list-element</h2>
<p>A (yet another) todo list built as a Custom Element.</p>
<p>
    <strong>License:</strong> MIT<br>
    <strong>Author:</strong> Paul Tavares <support@purtuga.com><br>
</p>
`;
});