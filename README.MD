## 什么是AST？
   全称抽象语法树(`Abstract Syntax Tree`)，源代码的抽象语法结构的树状形式表现。
## AST的作用
    1. 编译器
    2. 代码检查，eslint
    3. 代码的混淆与压缩，UglifyJS
    4. 代码转换，babel
## 生成AST的流程
从源码到AST的流程大致如下：
![enter image description here](http://km.oa.com/files/photos/pictures/202010/1603813315_53_w1290_h232.png)

 - **分词/词法分析(Tokenizing/Lexing)**： 通过从左往右的读取源码内容，将源码划分成为一个个词素（注意每个词素都是一个字符串）。之后将根据不同的词素将其归为不同的词法单元（token）。词法分析中的 token 可以用一个对象表示 `{type: '', value: ''}`, token的`type`可以是标识符（`Identifier`），关键字（`keyword`），整数（`integer`），空白符（`whitespace`）等，<font color=red>token的`value`即为词素</font>。
>分词(`tokenizing`)和词法分析(Lexing)之间的区别是非常微妙、晦涩的，主要差异在于词法单元的识别是通过有状态还是无状态的方式进行的。简单来说，如果词法单元生成器在判断 `a` 是一个独立的词法单元还是其他词法 单元的一部分时，调用的是有状态的解析规则，那么这个过程就被称为词法分析。
 - **语法分析(Parsing)**：这个过程是将`词法单元流`转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。这个树被称为“抽象语法树”(Abstract Syntax Tree，AST)。`var a = 2;` 的抽象语法树中可能会有一个叫作 `VariableDeclaration` 的顶级节点，接下来是一个叫作`Identifier`(它的值是`a`)的子节点，以及一个叫作 `AssignmentExpression` 的子节点。`AssignmentExpression` 节点有一个叫作 `NumericLiteral`(它的值是2)的子节点。

对于词法分析器来说源码就是一坨字符串，它只需逐个读取每个字符，然后根据词素进行断句生成词法单元流(数组)，js中的词素主要有：

 - 空白：JS中连续的空格、换行、缩进等这些如果不在字符串里，就没有任何实际逻辑意义，所以把连续的空白符直接组合在一起作为一个语法单元。
 - 注释：行注释或块注释，虽然对于人类来说有意义，但是对于计算机来说知道这是个“注释”就行了，并不关心内容，所以直接作为一个不可再拆的语法单元
 - 字符串：对于机器而言，字符串的内容只是会参与计算或展示，里面再细分的内容也是没必要分析的
 - 数字：JS语言里就有16、10、8进制以及科学表达法等数字表达语法，数字也是个具备含义的最小单元
 - 标识符：没有被引号扩起来的连续字符，可包含字母、_、$、及数字（数字不能作为开头）。标识符可能代表一个变量，或者true、false这种内置常量、也可能是if、return、function这种关键字，是哪种语义，分词阶段并不在乎，只要正确切分就好了。
 - 运算符：+、-、*、/、>、<等等
 - 括号：(...)可能表示运算优先级、也可能表示函数调用，分词阶段并不关注是哪种语义，只把“(”或“)”当做一种基本语法单元
 - 还有其他：如中括号、大括号、分号、冒号、点等等不再一一列举
    
以如下代码为例：
```js
let ast = 'is a tree';
```
这段代码经过词法分析后生成的词法单元流是：
```js
[
    {
        "type": "keyword",
        "value": "let"
    },
    {
        "type": "identifier",
        "value": "ast"
    },
    {
        "type": "operator",
        "value": "="
    },
    {
        "type": "string",
        "value": "is a tree"
    },
    {
        "type": "semicolon",
        "value": ";"
    }
]
```
接着词法单元流经过语法分析器的加工生成AST：
```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "let",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "ast"
                    },
                    "init": {
                        "type": "Literal",
                        "value": "is a tree"
                    }
                }
            ]
        }
    ]
}
```
## 特点
1. AST不含有语法细节，比如冒号、括号、分号
2. AST会压缩单继承节点
3. 操作符会变成内部节点，不再会以叶子节点出现在树的末端。
## 实现一个简单的AST生成器
经过上面介绍可以知道要实现一个AST生成器只需实现词法分析与语法分析这两步即可。
1. 词法分析

2. 语法分析


## 趁热打铁：实现一个简单的babel插件
https://zhuanlan.zhihu.com/p/102385477


参考：
1. http://caibaojian.com/ast.html
2. https://zhuanlan.zhihu.com/p/27289600 
3. https://zhuanlan.zhihu.com/p/32189701
4. https://www.sitepoint.com/understanding-asts-building-babel-plugin/
5. https://juejin.im/post/6844904035271573511
6. https://astexplorer.net/
7. https://github.com/estree/estree
8. https://zhuanlan.zhihu.com/p/26988179 
9. https://zhuanlan.zhihu.com/p/36301857
10. https://esprima.org/demo/parse.html#
11. http://kaiyuan.me/2016/04/19/compiler_lex/