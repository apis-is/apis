import { parseHTML } from 'linkedom'

function wrapNode(nodes) {
  if (!nodes) {
    nodes = []
  }

  if (!Array.isArray(nodes)) {

    if (nodes instanceof Function) {
      // dirty workaround if we're trying to wrap a wrapped node
      return nodes;
    }
    nodes = [nodes]
  }

  const $ = (selector) => typeof selector === 'string'
    ? wrapNode(nodes.reduce((acc, node) => [...acc, ...node.querySelectorAll(selector)], []))
    : wrapNode(selector)

  // extracting data
  $.text = () => nodes[0]?.textContent ?? ''
  $.html = () => nodes[0]?.innerHTML ?? ''
  $.attr = (name) => nodes[0]?.getAttribute(name)

  // selecting nodes
  $.nodes = nodes
  $.first = () => wrapNode(nodes[0])
  $.eq = (index) => wrapNode(nodes[index])
  $.slice = (start, end) => wrapNode(nodes.slice(start, end))

  // manipulating nodes
  $.remove = (selector) => {
    if (!selector) {
      nodes.forEach((node) => node.remove());
    } else {
      $(selector).remove();
    }
    return $
  }

  // children
  $.find = (selector) => wrapNode(Array.from(nodes[0]?.querySelectorAll(selector)))
  $.each = (callback) => nodes.forEach((node, index) => callback.call(node, index, node))
  $.children = () => wrapNode(nodes[0]?.children)


  return $;
}

function cheerio(selector, html) {
  // If only one argument is provided, then `selector` is the html
  // if `html` is an object, then it's `html` is options - TODO: ignore for now
  if (!html || typeof html === 'object') {
    html = selector
    selector = null
  }

  if (html instanceof Function) {
    return selector ? html.find(selector) : html
  }
  
  const { document } = parseHTML(html)
  return wrapNode(document)
}
cheerio.load = cheerio

module.exports = cheerio
