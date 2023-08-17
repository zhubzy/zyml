
# Introduction

Zyml is a simple **markdown language** that allows user to define formatted template in **word document (docx)** but also be expressive like an **excel formula**. It flows like natural English but also allows logics and branches without writing a single line of code, some use cases include:

- Email templating
- Prompt engineering

# Quick Start

```markdown
Hi {name},
{age >= 18} As an adult, the price for the ticket will total to ${price}.
{age < 18 or age > 80} As a youth or senior, you qualify for a half discount ${price * 0.5}

Best,
{company_name}
```

When given input age = 5, price = 100, name= Zach

```markdown
Hi Zach,

As a youth or senior, you qualify for a half discount $50

Best,

Playground Inc
```

# Node.JS

```tsx
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
```

# React / Browser

```tsx
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
```

# Rules supported so far

## Variables

Simplest building block of template, defined in the format of {VARIBLE_GOES_HERE} 

Example template:

```html
My income is ${income} per month.
```

Input: income = 20:

```html
My income is $20 per month.
```

## Expressions

Expressions compose of multiple variables and operators {VARIBLE1 OPERATOR1 VARIBLE2….}, like any excel / math formula. 

Example template:

```html
I will accumulate ${principle + principle * (1+APR)^year} in total after {year} of investing.
```

Input: princple = 100,000, APR = 0.3, year = 20:

```html
I will accumulate $180611.12346694147 in total after 20 of investing.
```

## Condition

Start each paragraph {CONDITION_GOES_HERE}, some examples include:

Example template:

```html
Here is what you need to do:
 - {amount_tax_due > 0} You need to pay ${amount_tax_due} due by {date} for your company tax.
 - {amount_payroll > 0} You need to pay ${amount_payroll} due by {date} for payroll.
```

Input: amount_tax_due = 0, date 1/1/23, amount_payroll = 0:

```html
Here is what you need to do:
 - You need to pay $30 due by 1/1/23 for your company tax.
```

Input: amount_tax_due = 10, date 1/1/23, amount_payroll = 0:

```html
Here is what you need to do:
 - You need to pay $10 due by 1/1/23 for payroll.
```

# Note:

- Variable name cannot have space!

# Acknowledgment

The project is mainly built on top of jsdom, mammoth, and express-eval. Thanks to the authors and contributors of those projects.