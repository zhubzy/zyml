export interface template_from_email_response {
    html_string: string;
    attributes: string[];
}
export type input_props = {
    [key: string]: string | number;
};
export interface expression {
    raw_string: string;
    decoded_string: string;
    isCondition: boolean;
    defaultValue?: string;
}
