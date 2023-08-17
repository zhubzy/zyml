import Base from "./base";

export class ZmlParser extends Base {
  async loadDocx(file: any): Promise<string> {
    if (typeof window !== "undefined") {
      const mammoth = require("mammoth/mammoth.browser");
      const buffer = await file.arrayBuffer();

      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      this.html_string = result.value;
      const parser = new DOMParser();
      this.document = parser.parseFromString(this.html_string, "text/html");
    }
    if (this.html_string) {
      return Promise.resolve(this.html_string);
    }
    return Promise.reject("Bad input file");
  }
}
