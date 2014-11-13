/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dictionary.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

/*
** The Dictionary's Class is calls by Keyboard's class for
** reloids the word's list with new arguments.
*/

var Dictionary = {
  'node': 'items',
  'tag': 'item',
  'root': './app/dictionary/',
  'search': Conf.dictionary.search,
  'limit': Conf.dictionary.limit,
  'json': undefined,
  'sort': undefined,

  'clear': function (arg) {
    var node   = document.querySelector(Dictionary.node);

    while (node.firstChild)
      node.removeChild(node.firstChild);
    return (node);
  },
  'put': function (letters) {
    var search = Dictionary[Dictionary.search];
    var words  = Dictionary.sort;
    var limit  = Dictionary.limit;
    var node   = Dictionary.clear();
    var count  = -1;
    var tag;

    while (node.firstChild)
      node.removeChild(node.firstChild);
    while (++count < words.length) {
      if (limit <= 0)
        break ;
      else if (search(letters, words[count])) {
        tag = document.createElement(Dictionary.tag);
        tag.appendChild(Word.put(words[count]));
        tag.appendChild(Delete.put());
        node.appendChild(tag);
        limit -= 1;
      }
    }
  },
  'firsts': function (word, letters) {
    /* HELlO, HELlo word! */
    var count = -1;

    while (word[++count])
      if (letters[count] !== word[count])
        return (false);
    return (true);
  },
  'first_afters': function (word, letters) {
    /* HeLlo, HeLlo word! */
    var count_word    = -1;
    var count_letters = -1;

    while (word[++count_word])
      while (letters[++count_letters] !== word[count_word])
        if (!letters[count_letters])
          return (false);
    return (true);
  },
  'default': window.addEventListener('load', function() {
    var address = Dictionary.root + Conf.dictionary.file;

    File.read(address).then(function(res, err) {
      if (!err) {
        Dictionary.json = JSON.parse(res);
        Dictionary.sort = Dictionary.json.sort();
      }
    });
  }, false)
};
