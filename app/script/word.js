/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   word.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#             */
/*   Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict';

/*
** The Word's Class is calls by Dictionary's class for
** adds a word's button at a item.
*/

var Word = {
  'tag': 'text',

  'put': function (text) {
    var tag = document.createElement(Word.tag);

    tag.addEventListener('click', Word.event, false);
    tag.textContent = text;
    return (tag);
  },
  'event': function (node) {
    var word = node.toElement.textContent;

    console.log('word', word);
    Dictionary.json[word] += 1;
    Search.clear();
    Dictionary.clear();
  }
}
