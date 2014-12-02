/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   capitalize.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var Capitalize = {
  'active': Conf.capitalize,
  'node': 'capitalize',

  'event': function (arg) {
    var node = document.querySelector('program');
    var active = (typeof arg === 'boolean' ? arg.active : Capitalize.active);

    node.setAttribute(Capitalize.node, active);
  },
  'default': window.addEventListener('click', function (arg) {
    var node = arg.toElement;
    var name = node.tagName.toLowerCase();

    if (name === Capitalize.node) {
      Capitalize.active = !Capitalize.active;
      Capitalize.event(undefined);
    }
  }, false)
};
