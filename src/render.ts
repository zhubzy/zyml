"use client";
import { input_props } from "./interface";
import { evaluteExpressionsFromElement } from "./helper";

//Takes template html and renders based on some input, run on client side

// Ideas:
// Reserved Keyword (this_year, today, etc)
// Default values
export default function render(
  html_string: string,
  input: input_props
): string {
  if (Object.keys(input).length == 0) return html_string;
  //Initalize the DOM Engine
  const parser = new DOMParser();
  const doc = parser.parseFromString(html_string, "text/html");
  const elements = doc.querySelectorAll("*"); // Select all elements

  elements.forEach((element) => {
    evaluteExpressionsFromElement(element, input);
  });

  return doc.body.outerHTML;
}
