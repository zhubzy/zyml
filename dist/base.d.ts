import { input_props, template_from_email_response } from "./interface";
export default class Base {
    protected config: {
        start_delimeter: string;
        end_delimeter: string;
    };
    protected html_string: string;
    protected document: Document | undefined;
    constructor(document?: Document, config?: any);
    /**
     * Actually returns the html template string and attribtues ready to be rendered
     */
    parseTemplate(): template_from_email_response;
    render(input: input_props): string;
    private replaceExpression;
    private traverseElementAndDescendants;
}
