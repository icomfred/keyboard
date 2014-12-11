/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   save.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var gui = require('nw.gui');

var Save = {
  'gui': gui.Window.get(),
  'alpha': false,
  'dict': false,

  'end': function (alpha, dict) {
    Save.alpha = Save.alpha ? Save.alpha : alpha;
    Save.dict  = Save.dict  ? Save.dict  : dict;

    if (Save.alpha && Save.dict)
      Save.gui.end(true);
  },
  'close': function (end) {
    var f_alpha = Keyboard.root + Conf.lang.locale + '/' + Conf.alphabet.file;
    var f_dict  = Dictionary.root + Conf.lang.locale + '.json';
    var d_alpha = JSON.stringify(Keyboard.json, null, 2, '\t');
    var d_dict  = JSON.stringify(Dictionary.json, null, 2, '\t');

    File.write(f_alpha, d_alpha).then(function(res, err) {
      if (end)
        Save.end(true, false);
    });
    File.write(f_dict, d_dict).then(function(res, err) {
      if (end)
        Save.end(false, true);
    });
  }
}
