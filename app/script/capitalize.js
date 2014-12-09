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
  'active': Conf.text.capitalize,
  'target': 'capitalize',
  'tag': 'capitalize',

  'search': function (arg) {
    /* Is capitalize's statut write by the program: see GUI's class. */
    var node   = document.querySelector(Dictionary.target);

    node.setAttribute(Capitalize.tag, Search.capitalize);
  },
  'keyboard': function (arg) {
    /* Is capitalize's statut write by the program: see GUI's class. */
    var node   = document.querySelector(Keyboard.target);

    node.setAttribute(Capitalize.tag, Keyboard.capitalize);
  },
  'program': function (arg) {
    /* Is capitalize's statut write by the user. */
    var node   = document.querySelector('program');
    var active = Capitalize.active;

    node.setAttribute(Capitalize.tag, active);
  },
  'init': window.addEventListener('click', function (arg) {
    var node = arg.toElement;
    var name = node.tagName.toLowerCase();

    if (name === Capitalize.target) {
      Capitalize.active = !Capitalize.active;
      Capitalize.program();
    }
  }, false),
  'default': window.addEventListener('load', function (arg) {
    Capitalize.program();
    Capitalize.search();
    Capitalize.keyboard();
  }, false)
};
