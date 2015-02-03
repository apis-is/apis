function combine () {
  return new RegExp('('+[].slice.call(arguments).map(function (e) {
    var e = e.toString()
    return '(?:' + e.substring(1, e.length - 1) + ')'
  }).join('|')+')')
}

function makeTester (rx) {
  var s = rx.toString()
  return new RegExp('^' + s.substring(1, s.length -1) + '$')
//  return new RegExp('('+[].slice.call(arguments).map(function (e) {
//    var e = e.toString()
//    return '(?:' + e.substring(1, e.length - 1) + ')'
//  }).join('|')+')')  
}

var pattern = {
  string1    : /"(?:(?:\\\n|\\"|[^"\n]))*?"/
, string2    : /'(?:(?:\\\n|\\'|[^'\n]))*?'/
//, string2    : /'(?:(?:\\'|[^']))*?'/
, comment1   : /\/\*[\s\S]*?\*\//
, comment2   : /\/\/.*?\n/
, whitespace : /\s+/
, keyword    : /\b(?:var|let|for|if|else|in|class|function|return|with|case|break|switch|export|new|while|do|throw|catch)\b/
, regexp     : /\/(?:(?:\\\/|[^\n\/]))*?\//
, name       : /[a-zA-Z_\$][a-zA-Z_\$0-9]*/
, number     : /\d+(?:\.\d+)?(?:e[+-]?\d+)?/
, parens     : /[\(\)]/
, curly      : /[{}]/
, square     : /[\[\]]/
, punct      : /[;.:\?\^%<>=!&|+\-,~]/
}

var match = combine(
  pattern.string1
, pattern.string2
, pattern.comment1
, pattern.comment2
, pattern.regexp
, pattern.whitespace
, pattern.name
, pattern.number
, pattern.parens
, pattern.curly
, pattern.square
, pattern.punct
)

var tester = {}

for(var k in pattern) {
  tester[k] = makeTester(pattern[k])
}

module.exports = function (str, doNotThrow) {
  return str.split(match).filter(function (e, i) {
    if(i % 2)
      return true

    if(e !== '') {
      if(!doNotThrow)
        throw new Error('invalid token:'+JSON.stringify(e))
      return true
    }
  })
}

module.exports.type = function (e) {
  for (var type in pattern)
    if(tester[type].test(e))
      return type
  return 'invalid'
}
