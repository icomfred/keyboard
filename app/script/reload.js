/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reload.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var Reload = {
  'node': 'clear',

  'clear': function (arg) {
    var reload = document.querySelector(Reload.node);

    Search.clear();
    Dictionary.clear();
  },
  'default': window.addEventListener('click', function (arg) {
    var name = arg.toElement.tagName.toLowerCase();
    var word;

    if (name === Reload.node) {
      Reload.clear();
    }
  }, false)
}
