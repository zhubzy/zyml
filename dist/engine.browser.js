"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZmlParser = void 0;
const base_1 = __importDefault(require("./base"));
class ZmlParser extends base_1.default {
    async loadDocx(file) {
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
exports.ZmlParser = ZmlParser;
