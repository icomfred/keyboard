/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mode.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var Mode = {
  'id': 'mode',
  'tag': 'option',
  'modes': Conf.search.modes,
  'mode': Conf.search.mode,

  'put': function (node) {
  	var count = -1;
  	var modes = Mode.modes;
  	var mode  = Mode.mode;
    var tag;

  	while (modes[++count]) {
      tag = document.createElement(Alphabet.tag);
      tag.textContent = modes[count];
      tag.textContent = Lang.translate(tag.textContent, {});
      tag.setAttribute('value', modes[count]);
      if (modes[count] == mode)
        tag.setAttribute('selected', 'selected');
      node.appendChild(tag);
    }
  },
  'event': function (node) {
    var node = document.getElementById(Mode.id);
    var mode = node.value;

    Conf.search.mode = mode;
    Mode.mode = mode;
  },
  'init': function (arg) {
    var node = document.getElementById(Mode.id);

    while (node.firstChild)
      node.removeChild(node.firstChild);
    Mode.put(node);
    node.addEventListener('change', Mode.event);
  }
};
