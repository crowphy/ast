const tokenizer = require('./tokenizer');

const parser = (code) => {
    const tokens = tokenizer(code);
    const ast = {
        type: 'Program',
        body: []
    };
    let current = 0;
    const KINDS = ['var', 'let', 'const'];

    console.log('tokens:', JSON.stringify(tokens));

    const walk = () => {
        let token = tokens[current];
        if (!token) {
            return;
        }
        // keyword代表接下来是一个语句
        if (token.type === 'keyword' && KINDS.includes(token.value)) {
            const kind = token.value;
            const node = {
                type: 'VariableDeclaration',
                kind: kind,
                declarations: []
            }
            token = tokens[++current];

            while (token && token.type !== 'semicolon') {
                const result = walk();
                node.declarations.push(result);
                token = tokens[++current];
            }
            return node;
        }

        if (token.type === 'identifier') {
            current++;
            const node = {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: token.value
                }
            };
            token = tokens[current];
            while (token && token.type !== 'semicolon') {
                const result = walk();
                if (result && result.type === 'Literal') {
                    node.init = result;
                }
                token = tokens[++current];
            }
            
            return node;
        }

        if (token.type === 'string') {
            current++;
            return {
                type: 'Literal',
                value: token.value
            }
        }
    }

    while (current < tokens.length) {
        ast.body.push(walk());
    }
    
    return ast;
}

const code = `let ast = 'is a tree';`

const ast = parser(code);
console.log('tokens:', JSON.stringify(ast));