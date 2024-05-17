# About the projects

It an AI-powered assistant designed to help with project management and software development tasks. I can assist with a variety of tasks including:

Project specification and onboarding: It can create detailed project specifications including functional and non-functional requirements.Provide templates for requirement documents.Outline technical requirements, including system architecture, technology stack, and integration points.It can also Create a comprehensive welcome guide for new team members.

Project Management: Creating and updating project plans, tracking progress, and managing resources based on the resource provided.

Software Development: Providing coding assistance, debugging help, and software documentation.

# Setup guides

run yarn install
run yarn dev

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
