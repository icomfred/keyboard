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

var Lang = {
  'id': 'lang',
  'tag': 'option',
  'locales': Conf.lang.locales,
  'locale': Conf.lang.locale,

  'put': function (node) {
  	var count = -1;
  	var locales = Lang.locales;
  	var locale  = Lang.locale;
    var tag;

  	while (locales[++count]) {
      tag = document.createElement(Alphabet.tag);
      tag.textContent = locales[count];
      tag.setAttribute('value', locales[count]);
      if (locales[count] == locale)
        tag.setAttribute('checked', 'checked');
      node.appendChild(tag);
    }
  },
  'event': function (arg) {
  	console.log('lang event');
  },
  'init': function (arg) {
    var node = document.getElementById(Lang.id);

    Lang.put(node);
    node.addEventListener('change', Lang.event);
  }
};
