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

Object.prototype.max = function (before) {
  var count = -1;
  var items  = Object.keys(this);
  var max;

  while (items[++count]) {
    if (max === undefined || max < this[items[count]])
      if (before === undefined || this[items[count]] < before)
        max = this[items[count]];
  }
  return (max);
};

var Search = {
  'node': 'search',

  'sort': function (arg) {
    var items = Object.keys(arg);
    var limit = items.length;
    var max   = arg.max();
    var sort  = [];
    var count;

    while (sort.length < limit) {
      count = -1;
      while (++count < limit)
        if (max == arg[items[count]])
          sort.push(items[count]);
      max = arg.max(max);
    }
    return (sort);
  },
  'clear': function (arg) {
    var node = document.querySelector(Search.node);

    Dictionary.sort = Search.sort(Dictionary.json);
    node.textContent = '';
  },
  'put': function (letter) {
    var node = document.querySelector(Search.node);

    node.textContent += letter;
    Dictionary.put(node.textContent);
  },
  'default': window.addEventListener('click', function (arg) {
    var node = arg.toElement;
    var name = node.tagName.toLowerCase();
    var word;

    if (name === Search.node) {
      word = node.textContent
      if (word.length) {
        if (typeof Dictionary.json[word] !== 'number')
          Dictionary.json[word] = 1;
        else
          Dictionary.json[word] += 1;
        Door.send({'class': 'keyboard', 'method': 'shell'}, {'key': word});
        Search.clear();
        Dictionary.clear();
      }
    }
  }, false)
};
