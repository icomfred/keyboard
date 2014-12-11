/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lang.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var I18n = require('i18n-node')
var i18n = new I18n({
  'directory': Conf.lang.path
});

/* 
** The Lang's class is calls for translate the text.
*/

var Lang = {
  'id': 'lang',
  'tag': 'option',
  'target': 'menu',
  'locales': Conf.lang.locales,
  'locale': Conf.lang.locale,

  'translate': function (key, value) {
    var lang = i18n.t(Lang.locale, key, value)

    return (lang);
  },
  'put': function (node) {
  	var count = -1;
  	var locales = Lang.locales;
  	var locale  = Lang.locale;
    var tag;

  	while (locales[++count]) {
      tag = document.createElement(Alphabet.tag);
      tag.textContent = locales[count];
      tag.textContent = Lang.translate(tag.textContent, {});
      tag.setAttribute('value', locales[count]);
      if (locales[count] == locale)
        tag.setAttribute('selected', 'selected');
      node.appendChild(tag);
    }
  },
  'event': function (arg) {
    var node = document.getElementById(Lang.id);
    var lang = node.value ? node.value : Lang.locale;

    Conf.lang.locale = lang;
    Lang.locale = lang;
    Lang.init();
    Alphabet.init();
    Dictionary.init();
    Mode.init();
    Reload.clear();
  },
  'init': function (arg) {
    var node = document.getElementById(Lang.id);

    while (node.firstChild)
      node.removeChild(node.firstChild);
    Lang.put(node);
    node.addEventListener('change', Lang.event);
  }
};
