import { DOMParser, parseHTML } from 'linkedom'

function extractDataFromNode(node) {
  // console.log('extracting data from node', node.localName, node.childNodes.length, node.childNodes[0]?.nodeType)
  if (node.localName === '#text') {
    return node.textContent
  }

  const result = {};

  if (node.attributes?.length > 0) {
    result.$ = {}
    for (const attribute of node.attributes) {
      result.$[attribute.name] = attribute.value
    }
  }

  const childNodes = node.childNodes;

  // TODO: text is nodeType === 3?
  if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
    if (result.$) {
      return {
        ...result,
        _: childNodes[0].textContent
      }
    } else {
      return childNodes[0].textContent
    }
  }

  for (const child of node.children) {
    const name = child.localName;

    if (result[name]) {
      result[name].push(extractDataFromNode(child))
    } else {
      result[name] = [extractDataFromNode(child)]
    }
  }

  return result;
}

export const parseString = (xml, options, callback) => {
  if (!callback && typeof options === 'function') {
    callback = options
    options = {}
  }
  
  let result;
  try {
    const document = (new DOMParser).parseFromString(xml, 'text/xml')
    // const { document } = linkedom.parseHTML(xml)

    if (options.explicitRoot === false) {
      result = extractDataFromNode(document.children[0])
    } else {
      result = {
        [document.children[0].localName]: extractDataFromNode(document.children[0])
      }
    }
  } catch (error) {
    return callback(error)
  }

  // TODO: handle `options.explicitRoot`

  
  return callback(null, result)
}
