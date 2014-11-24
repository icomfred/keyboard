/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   keyboard.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

/*
** The Keyboard's Class is init by Jade's Class, it's role is 
** of reload the letters of keyboard.
*/

var Keyboard = {
  'node': 'letters',
  'tag': 'letter',
  'root': './app/alphabet/',
  'json': undefined,
  'letter': Conf.alphabet.letter,

  'clear': function (arg) {
    var node = document.querySelector(Keyboard.node);

    while (node.firstChild)
      node.removeChild(node.firstChild);
    return (node);
  },
  'put': function (json) {
    var node  = Keyboard.clear();
    var sort  = Search.sort(json);
    var count = -1;
    var tag;

    while (node.firstChild)
      node.removeChild(node.firstChild);
    while (sort[++count]) {
      tag = document.createElement(Keyboard.tag);
      tag.textContent = sort[count];
      tag.addEventListener('click', Keyboard.event, false);
      node.appendChild(tag);
    }
  },
  'event': function (tag) {
    var letter = tag.toElement.textContent;

    Keyboard.json[Keyboard.letter][letter] += 1;
    Keyboard.letter = letter;
    Keyboard.put(Keyboard.json[letter]);
    Search.put(letter);
    Reload.start();
  },
  'default': window.addEventListener('load', function (arg) {
    var address = Keyboard.root + Conf.lang.locale + '/' + Conf.alphabet.file;
    var letter  = Keyboard.letter;

    File.read(address).then(function (res, err) {
      if (!err) {
        Keyboard.json = JSON.parse(res);
        Keyboard.put(Keyboard.json[letter]);
      }
    });
  }, false)
};