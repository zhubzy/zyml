import { expression } from "./interface";
import { input_props } from "./interface";
/** Given a string, return all parsable expressions from it as well as attibutes
 *

 *
 * Ex. {my_name} is happy to celeberate his {birthday} today!
*/
export declare function findAllAttributes(html_string: string, delimeterStart: string, delimeterEnd: string, document: Document): [string[], expression[]];
export declare function decodeHTML(encoded: string, document: Document): string;
export declare function expressionIsCondition(expression: string): boolean;
export declare function evaluteExpressionsFromElement(element: any, input: input_props): void;
