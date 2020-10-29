// const babel = require('@babel/parser')

const KEYWORDS = ['let'];
const OPERATORS = ['+', '='];
const CHAR_EXP = /[a-z]/i;
    
const tokenizer = (input) => {
    let current = 0;
    const tokens = [];
    while (current < input.length) {
        let char = input[current];

        if (CHAR_EXP.test(char)) {
            let value = '';
            while (char !== undefined && CHAR_EXP.test(char)) {
                value += char;
                char = input[++current];
            }
            if (KEYWORDS.includes(value)) {
                tokens.push({
                    type: 'keyword',
                    value: value
                });
                continue;
            } else {
                tokens.push({
                    type: 'identifier',
                    value: value
                });
                continue;
            }
        }

        // if (/\s/.test(char)) {
        //     tokens.push({
        //         type: 'whitespace',
        //         value: char
        //     });
        //     current++;
        //     continue;
        // }

        if (OPERATORS.includes(char)) {
            tokens.push({
                type: 'operator',
                value: char
            });
            current++;
            continue;
        }

        if (char === '\'') {
            char = input[++current];
            if (CHAR_EXP.test(char)) {
                let value = '';
                while (char !== '\'') {
                    value += char;
                    char = input[++current];
                }
                tokens.push({
                    type: 'string',
                    value: value
                });
                current++;
                continue;
            }
        }

        if (char === ';') {
            tokens.push({
                type: 'semicolon',
                value: char
            });
            current++;
            continue;
        }
        current++;
    }
    return tokens;
}

// // const code = `let`
// const code = `let ast = 'is a tree';`
// // 关键字、标识符、操作符、字符串、分号、空格
// // 拆分：'let'、'ast'、'='、'\'is a tree\''、';'
// // tokenizer(code)
// const tokens = tokenizer(code);
// console.log('tokens:', JSON.stringify(tokens));

module.exports = tokenizer;
