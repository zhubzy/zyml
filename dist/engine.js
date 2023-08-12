"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZmlParser = void 0;
const base_1 = __importDefault(require("./base"));
class ZmlParser extends base_1.default {
    async loadDocx(filePath) {
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
exports.ZmlParser = ZmlParser;
