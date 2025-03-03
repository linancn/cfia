# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.


### Translation

```bash
npx docusaurus write-translations --locale en
npx docusaurus write-translations --locale zh-CN
```

### Publish

```bash
git tag

git tag v0.0.1
git push origin v0.0.1
```
npx markdownlint-cli2 "**/*.md" "#node_modules"