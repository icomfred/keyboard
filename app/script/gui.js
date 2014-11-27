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
    Gui.run(text, argv);
  }
};
