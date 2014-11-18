/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   alphabet.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';


var Alphabet = {
  'id': 'alphabet',
  'tag': 'option',
  'files': Conf.alphabet.files,
  'file': Conf.alphabet.file,

  'put': function (node) {
  	var count = -1;
  	var files = Alphabet.files;
  	var file  = Alphabet.file;
    var tag;

  	while (files[++count]) {
      tag = document.createElement(Alphabet.tag);
      tag.textContent = files[count].replace(/\.[^/.]+$/, '');
      tag.setAttribute('value', files[count]);
      if (files[count] == file)
        tag.setAttribute('checked', 'checked');
      node.appendChild(tag);
    }
  },
  'event': function (arg) {
    var node    = document.getElementById(Alphabet.id);
    var value   = node.value ? node.value : Conf.alphabet.file;
    var address = Keyboard.root + Conf.lang.locale + '/' + value;
    var letter  = Keyboard.letter;

    console.log(address);
    File.read(address).then(function (res, err) {
      console.log(err);
      if (!err) {
        Keyboard.json = JSON.parse(res);
        Keyboard.put(Keyboard.json[letter]);
      }
    });
  },
  'init': function (arg) {
    var node = document.getElementById(Alphabet.id);

    Alphabet.put(node);
    node.addEventListener('change', Alphabet.event);
  }
};
