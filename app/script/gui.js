/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   gui.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var py = require('python-shell');

String.prototype.capitalize = function() {
  return (this.charAt(0).toUpperCase() + this.slice(1));
};

String.prototype.argument = function() {
  var count   = -1;
  var results = '';

  while (++count < this.length)
    results += '{' + this[count] + '}';
  return (results);
};

/* 
** The Gui's class is calls for request the socket of
** says a sentence.
*/

var Gui = {
  'silent': false,
  'uppercase': Conf.text.uppercase,
  'nouppercase': Conf.text.nouppercase,
  'capitalize': true,
  'space': false,

  'run': function (text, argv) {
    if (!Gui.silent) {
      py.run('gui.py', {
        'scriptPath': './app/python/',
        'pythonPath': Conf.python.path,
        'args': ((typeof argv === 'object') ? argv : [])
      }, function (err, results) {
        Door.send({
          'class': 'keyboard',
          'method': 'shell'
        }, {
          'key': text
        });
        if (err)
          Debug.console(err);
      });
    }
  },
  'keyboard_letter': function (letter) {
    /* This function is called by the Keyboard's Class for write a letter
    ** or a ponctuation. */
    var uppercase   = Gui.uppercase;
    var nouppercase = Gui.nouppercase;
    var capitalize  = Capitalize.active ? Keyboard.capitalize : false;
    var space       = Lang.translate(' ', undefined);
    var shell       = '';

    Keyboard.capitalize  = (uppercase.indexOf(letter) !== -1) ? true : false;
    Gui.capitalize  = (nouppercase.indexOf(letter) !== -1) ? true : false;
    letter = Lang.translate(letter, undefined);
    shell = (capitalize) ? letter.capitalize().argument() : letter.argument();
    if (Keyboard.capitalize || Gui.capitalize) {
      Search.capitalize = (!Keyboard.capitalize) ? false : true;
      Reload.clear();
      if (Gui.space)
        shell = '+{left}' + shell;
    }
    Gui.space = false;
    Gui.run(shell, undefined);
  },
  'search_letter': function (letters) {
    /* This function is called by the Search's Class for write a letters
    ** or a ponctuation. */
    var uppercase   = Gui.uppercase;
    var space      = Lang.translate(' ', undefined);
    var shell      = '^+{left}';

    if (Search.capitalize) {
      if (Capitalize.active)
        letters = letters.capitalize();
      Search.capitalize = false;
    }
    shell += letters.argument();
    shell += '{' + space + '}';
    Gui.space = true;
    Gui.run(shell, undefined);
  }
};
