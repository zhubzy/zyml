import React, { useState } from "react";
import { ZmlParser } from "zyml";
let parser = new ZmlParser();
export default function App() {
  const [html, setHtml] = useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await parser.loadDocx(file);
      parser.parseTemplate();
      /** Replace with your own input specific to template */
      let sample_input = {
        name: "Zach",
        price: 100,
        age: 5,
        company_name: "Playground Inc",
      };

      let out = parser.render(sample_input);
      setHtml(out);

      console.log(out);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input onChange={handleFileChange} type="file" />
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
