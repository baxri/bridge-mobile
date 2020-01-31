// TODO This code has been copied until https://github.com/moroshko/autosuggest-highlight/pull/12 has been merged
// Copied from https://github.com/kuhma/autosuggest-highlight/blob/match_options/src/match.js that includes the insideWords option

var removeDiacritics = require('diacritic').clean

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
var specialCharsRegex = /[.*+?^${}()|[\]\\]/g

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6
var wordCharacterRegex = /[a-z0-9_]/i

var whitespacesRegex = /\s+/

function escapeRegexCharacters(str) {
  return str.replace(specialCharsRegex, '\\$&')
}

function extend(subject, baseObject) {
  subject = subject || {}
  Object.keys(subject).forEach(function(key) {
    baseObject[key] = !!subject[key]
  })
  return baseObject
}

module.exports = function match(text, query, options) {
  options = extend(options, {
    insideWords: false,
    findAllOccurrences: false,
    requireMatchAll: false
  })

  text = removeDiacritics(text)
  query = removeDiacritics(query)

  return (
    query
      .trim()
      .split(whitespacesRegex)
      // If query is blank, we'll get empty string here, so let's filter it out.
      .filter(function(word) {
        return word.length > 0
      })
      .reduce(function(result, word) {
        var wordLen = word.length
        var prefix =
          !options.insideWords && wordCharacterRegex.test(word[0]) ? '\\b' : ''
        var regex = new RegExp(prefix + escapeRegexCharacters(word), 'i')
        var occurrence, index

        occurrence = regex.exec(text)
        if (options.requireMatchAll && occurrence === null) {
          text = ''
          return []
        }

        while (occurrence) {
          index = occurrence.index
          result.push([index, index + wordLen])

          // Replace what we just found with spaces so we don't find it again.
          text =
            text.slice(0, index) +
            new Array(wordLen + 1).join(' ') +
            text.slice(index + wordLen)

          if (!options.findAllOccurrences) {
            break
          }

          occurrence = regex.exec(text)
        }

        return result
      }, [])
      .sort(function(match1, match2) {
        return match1[0] - match2[0]
      })
  )
}
