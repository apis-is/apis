const fs = require('fs')
const globby = require('globby')
const marked = require('marked')

globby(['./docs/*.md', './endpoints/**/*.md', '!node_modules/**']).then(paths => {
  let content = ''
  paths.forEach(path => {
    content += fs.readFileSync(path, 'utf8')
  })
  const html = marked(content, { escapeMarkdown: false })
  fs.writeFileSync('./docs/dist/index.html', html, 'utf8')
}).catch(error => {
  console.error(error)
})
