/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   search.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var Search = {
  'target': 'search',
  'capitalize': true,

  'max': function (list, before) {
    /* The anonym function returns the max number value
    ** into a list's object. */
    var count = -1;
    var items = Object.keys(list);
    var max;

    while (items[++count]) {
      if (max === undefined || max < list[items[count]])
        if (before === undefined || list[items[count]] < before)
          max = list[items[count]];
    }
    return (max);
  },
  'sort': function (list) {
    /* The anonym function returns the converting
    ** from a number's Object to a sort number's Array. */
    if (list) {
      var items = Object.keys(list);
      var limit = items.length;
      var max   = Search.max(list);
      var sort  = [];
      var count;

      while (sort.length < limit) {
        count = -1;
        while (++count < limit)
          if (max == list[items[count]])
            sort.push(items[count]);
        max = Search.max(list, max);
      }
      return (sort);
    }
  },
  'clear': function (arg) {
    var node = document.querySelector(Search.target);

    Dictionary.sort = Search.sort(Dictionary.json);
    node.textContent = '';
  },
  'put': function (letter) {
    var node = document.querySelector(Search.target);

    node.textContent += letter;
    Dictionary.put(node.textContent);
  },
  'event': function (letters) {
    var count = -1;

    Gui.search_letter(letters);
    Search.clear();
    Dictionary.clear();
    Capitalize.search();
  },
  'default': window.addEventListener('click', function (arg) {
    var node = arg.toElement;
    var name = node.tagName.toLowerCase();
    var word;

    if (name === Search.target) {
      word = node.textContent
      if (word.length) {
        if (typeof Dictionary.json[word] !== 'number')
          Dictionary.json[word] = 1;
        else
          Dictionary.json[word] += 1;
        Search.event(word);
      }
    }
  }, false)
};
