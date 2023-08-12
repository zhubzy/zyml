"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluteExpressionsFromElement = exports.expressionIsCondition = exports.decodeHTML = exports.findAllAttributes = void 0;
const expr_eval_1 = require("expr-eval");
/** Given a string, return all parsable expressions from it as well as attibutes
 *

 *
 * Ex. {my_name} is happy to celeberate his {birthday} today!
*/
function findAllAttributes(html_string, delimeterStart, delimeterEnd, document) {
    //Take the thing out in the bracket
    const stack = [];
    let attributes = [];
    let expressions = [];
    for (let i = 0; i < html_string.length; i++) {
        const currentCharacter = html_string.charAt(i);
        if (stack.length == 0 && currentCharacter === delimeterStart) {
            stack.push(i + 1);
        }
        else if (stack.length == 1 && currentCharacter === delimeterEnd) {
            let start = stack.pop();
            if (start) {
                let raw = html_string.substring(start, i);
                let attribute = decodeHTML(raw, document);
                expressions.push({
                    raw_string: raw,
                    decoded_string: attribute,
                    isCondition: expressionIsCondition(attribute),
                });
                console.log(attribute);
                try {
                    const currAttributes = expr_eval_1.Parser.parse(attribute).variables();
                    currAttributes.map((val) => {
                        attributes.push(val);
                    });
                }
                catch (error) {
                    throw Error(`Check attribute or expression ${attribute}, make sure no space in the name! `);
                }
            }
        }
    }
    return [attributes, expressions];
}
exports.findAllAttributes = findAllAttributes;
function decodeHTML(encoded, document) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = encoded;
    return tempDiv.textContent || tempDiv.innerText;
}
exports.decodeHTML = decodeHTML;
function expressionIsCondition(expression) {
    const expressionsLists = [">", "<", "==", "and", "or"];
    const isExp = expressionsLists.some((symbol) => expression.includes(symbol));
    return isExp;
}
exports.expressionIsCondition = expressionIsCondition;
function evaluteExpressionsFromElement(element, input) {
    if (element.classList && element.classList.value) {
        let isExpression = expressionIsCondition(element.classList.value);
        if (isExpression) {
            const shouldRender = expr_eval_1.Parser.parse(element.classList.value).evaluate(input);
            if (!shouldRender)
                element.innerHTML = "";
        }
        else {
            element.textContent = expr_eval_1.Parser.parse(element.classList.value).evaluate(input);
        }
    }
}
exports.evaluteExpressionsFromElement = evaluteExpressionsFromElement;
