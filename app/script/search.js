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

Object.prototype.sort = function (arg) {
  var items = Object.keys(this);
  var limit = items.length;
  var max   = this.max();
  var sort  = [];
  var count;

  while (sort.length < limit) {
    count = -1;
    while (++count < limit)
      if (max == this[items[count]])
        sort.push(items[count]);
    max = this.max(max);
  }
  return (sort);
};

var Search = {
  'node': 'search',

  'clear': function (arg) {
    var node = document.querySelector(Search.node);

    Dictionary.sort = Dictionary.json.sort();
    node.textContent = '';
  },
  'put': function (letter) {
    var node = document.querySelector(Search.node);

    node.textContent += letter;
    Dictionary.put(node.textContent);
  },
  'default': window.addEventListener('click', function(arg) {
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
        console.log('word', word);
        Search.clear();
        Dictionary.clear();
      }
    }
  }, false)
};
