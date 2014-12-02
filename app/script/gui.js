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

/* 
** The Gui's class is calls for request the socket of
** says a sentence.
*/

var Gui = {
  'silent': false,
  'sentence': undefined,

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
  'call': function (text, argv) {
    if (Capitalize.active) {
      text = text.capitalize();
      Capitalize.event(false);
    }
    Gui.run(text, argv);
  }
};
