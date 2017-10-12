const fs = require('fs')
const globby = require('globby')
const marked = require('marked')

globby(['**/*.md', '!node_modules/**', '!README.md']).then(paths => {
  let content = fs.readFileSync('./docs/header.html', 'utf8')
  paths.forEach(path => {
    content += fs.readFileSync(path)
  })
  const html = marked(content, { escapeMarkdown: false })
  fs.writeFileSync('./docs/dist/index.html', html, 'utf8')
}).catch(error => {
  console.error(error)
})
