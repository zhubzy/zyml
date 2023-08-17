"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
class Base {
    config = {
        start_delimeter: "{",
        end_delimeter: "}",
    };
    html_string = "";
    document;
    constructor(document, config) {
        if (config)
            this.config = config;
    }
    /**
     * Actually returns the html template string and attribtues ready to be rendered
     */
    parseTemplate() {
        if (this.document == undefined)
            throw Error("Document not loaded");
        const body = this.document.querySelector("body");
        let attributes = [];
        if (body) {
            this.replaceExpression(body, attributes);
            return { html_string: body.outerHTML, attributes: attributes };
        }
        throw Error("bad template");
    }
    render(input) {
        if (this.document == undefined)
            throw Error("Document not loaded");
        if (Object.keys(input).length == 0)
            return this.html_string;
        //Initalize the DOM Engine
        const elements = this.document.querySelectorAll("*"); // Select all elements
        elements.forEach((element) => {
            (0, helper_1.evaluteExpressionsFromElement)(element, input);
        });
        return this.document.body.outerHTML;
    }
    replaceExpression(element, attibutes) {
        if (this.document == undefined)
            throw Error("Document not loaded");
        if (element.tagName != "BODY") {
            // console.log(element.tagName);
            let [attribute, expressions] = (0, helper_1.findAllAttributes)(element.innerHTML, this.config.start_delimeter, this.config.end_delimeter, this.document);
            attribute.forEach((attr) => {
                attibutes.push(attr);
            });
            expressions.forEach((exp) => {
                //Check if arribute is a condition:
                if (exp.isCondition) {
                    //If it is then add className to parent
                    element.className = exp.decoded_string;
                    element.innerHTML = element.innerHTML.replace(this.config.start_delimeter +
                        exp.raw_string +
                        this.config.end_delimeter, "");
                }
                else {
                    //If not add span by replacing with default value
                    element.innerHTML = element.innerHTML.replace(this.config.start_delimeter + exp.raw_string + this.config.end_delimeter, `<span class="${exp.decoded_string}">${""}</span>`);
                }
            });
        }
        for (let i = 0; i < element.children.length; i++) {
            this.replaceExpression(element.children[i], attibutes);
        }
    }
    traverseElementAndDescendants(element, input) {
        element.childNodes.forEach((childNode) => {
            // Process the element node
            this.traverseElementAndDescendants(childNode, input);
        });
        (0, helper_1.evaluteExpressionsFromElement)(element, input);
    }
}
exports.default = Base;
