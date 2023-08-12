import { Parser } from "expr-eval";
import { expression } from "./interface";
import { input_props } from "./interface";

/** Given a string, return all parsable expressions from it as well as attibutes
 * 

 * 
 * Ex. {my_name} is happy to celeberate his {birthday} today!
*/

export function findAllAttributes(
  html_string: string,
  delimeterStart: string,
  delimeterEnd: string,
  document: Document
): [string[], expression[]] {
  //Take the thing out in the bracket
  const stack = [];
  let attributes: string[] = [];
  let expressions: expression[] = [];
  for (let i = 0; i < html_string.length; i++) {
    const currentCharacter = html_string.charAt(i);
    if (stack.length == 0 && currentCharacter === delimeterStart) {
      stack.push(i + 1);
    } else if (stack.length == 1 && currentCharacter === delimeterEnd) {
      let start = stack.pop();
      if (start) {
        let raw: string = html_string.substring(start, i);

        let attribute: string = decodeHTML(raw, document);
        expressions.push({
          raw_string: raw,
          decoded_string: attribute,
          isCondition: expressionIsCondition(attribute),
        });
        console.log(attribute);
        try {
          const currAttributes = Parser.parse(attribute).variables();
          currAttributes.map((val) => {
            attributes.push(val);
          });
        } catch (error) {
          throw Error(
            `Check attribute or expression ${attribute}, make sure no space in the name! `
          );
        }
      }
    }
  }
  return [attributes, expressions];
}

export function decodeHTML(encoded: string, document: Document) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = encoded;
  return tempDiv.textContent || tempDiv.innerText;
}

export function expressionIsCondition(expression: string): boolean {
  const expressionsLists = [">", "<", "==", "and", "or"];
  const isExp = expressionsLists.some((symbol) => expression.includes(symbol));

  return isExp;
}

export function evaluteExpressionsFromElement(
  element: any,
  input: input_props
) {
  if (element.classList && element.classList.value) {
    let isExpression = expressionIsCondition(element.classList.value);
    if (isExpression) {
      const shouldRender = Parser.parse(element.classList.value).evaluate(
        input
      );
      if (!shouldRender) element.innerHTML = "";
    } else {
      element.textContent = Parser.parse(element.classList.value).evaluate(
        input
      );
    }
  }
}
