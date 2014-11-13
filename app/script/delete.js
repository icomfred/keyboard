/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

/*
** The Delete's Class is calls by Dictionary's class for
** adds a delete's button at a item.
*/

var Delete = {
  'tag': 'delete',
  'text': String.fromCharCode(10005),

  'put': function (arg) {
    var tag = document.createElement(Delete.tag);

    tag.addEventListener('click', Delete.event, false);
    tag.textContent = Delete.text;
    return (tag);
  },
  'event': function (node) {
    var node = node.toElement;
    var word = node.previousElementSibling.textContent;

    node.parentNode.parentNode.removeChild(node.parentNode);
    delete (Dictionary.json[word]);
  }
}
