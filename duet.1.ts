// typescript: create express app
import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


## tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src/**/*"
  ]
}

## tslint.json

{
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended"
  ],
  "rules": {
    "no-console": false
  }
}

## package.json

{
  "name": "typescript-express-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc && node dist/demo.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.13",
    "typescript": "^4.4.4"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}

## .gitignore

node_modules
dist

## .vscode/launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/dist/demo.js",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}

## .vscode/tasks.json

{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "tsc: build - tsconfig.json",
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "option<ctrl36><ctrl37>s": {
        "module": "commonjs",
        "sourceMap": true,
        "inlineSources": true,
        "inlineSourceMap": true
      },
      "problemMatcher": [
        "$tsc-watch"
      ]
    }
  ]
}

## .vscode/settings.json

{
  "typescript.tsdk": "node_modules/typescript/lib"
}

## .vscode/extensions.json

{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eg2.tslint",
    "ms-vscode.vscode-typescript-tslint-plugin"
  ]
}

## .eslintrc.json

{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises	": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "no-case-declarations": "off",
    "no-inner-declarations": "off",
    "no-prototype-builtins": "off",
    "no-redeclare": "off",
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "prettier/prettier": "error"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}

## .prettierrc.json

{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "endOfLine": "lf"
}

## .eslintignore

node_modules
dist

## .prettierignore

node_modules
dist

## .editorconfig

root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
