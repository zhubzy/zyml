"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
//Takes template html and renders based on some input, run on client side
// Ideas:
// Reserved Keyword (this_year, today, etc)
// Default values
function render(html_string, input) {
    if (Object.keys(input).length == 0)
        return html_string;
    //Initalize the DOM Engine
    const parser = new DOMParser();
    const doc = parser.parseFromString(html_string, "text/html");
    const elements = doc.querySelectorAll("*"); // Select all elements
    elements.forEach((element) => {
        (0, helper_1.evaluteExpressionsFromElement)(element, input);
    });
    return doc.body.outerHTML;
}
exports.default = render;
