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
** of reload the letters of keyboard and press the key.
*/

var Keyboard = {
  'target': 'keyboard',
  'node': 'letters',
  'tag': 'letter',
  'tag2': 'text',
  'root': './app/alphabet/',
  'json': undefined,
  'letter': Conf.alphabet.letter,
  'capitalize': true,

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
    var tag2;
    var tag;

    while (node.firstChild)
      node.removeChild(node.firstChild);
    while (sort[++count]) {
      tag2 = document.createElement(Keyboard.tag2);
      tag2.textContent = sort[count];
      tag2.setAttribute('data-text', sort[count]);
      tag2.addEventListener('click', Keyboard.event, false);
      tag = document.createElement(Keyboard.tag);
      tag.appendChild(tag2);
      node.appendChild(tag);
    }
  },
  'event': function (tag) {
    var letter = tag.toElement.textContent;

    Keyboard.json[Keyboard.letter][letter] += 1;
    Keyboard.letter = letter;
    Keyboard.put(Keyboard.json[letter]);
    Search.put(letter);
    Gui.keyboard_letter(letter);
    Capitalize.search();
    Capitalize.keyboard();
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
