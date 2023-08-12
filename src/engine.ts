import Base from './base'

export class ZmlParser extends Base {
  async loadDocx(filePath: string): Promise<string> {
    const mammoth = require("mammoth");
    const path = require("path");
    const result = await mammoth.convertToHtml({
      path: path.resolve(filePath),
    });
    this.html_string = result.value;
    const { JSDOM } = require("jsdom");
    this.document = new JSDOM(this.html_string).window.document;

    if (this.html_string) {
      return Promise.resolve(this.html_string);
    }
    return Promise.reject("Bad input file");
  }
}
