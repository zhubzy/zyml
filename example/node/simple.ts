import { ZmlParser } from "../../src/engine";

var parser = new ZmlParser();
async function main() {
  await parser.loadDocx("example/simple.docx");
  parser.parseTemplate();
  /** Replace with your own input specific to template */
  let sample_input = {
    name: "Zach",
    price: 100,
    age: 5,
    company_name: "Playground Inc",
  };
  let out = parser.render(sample_input);
}

main();
