# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    keyboard.py                                        :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#              #
#    Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import pykeyboard

class Keyboard():
  """The class Keyboard is a simple library of basing functions.""";
  k = pykeyboard.PyKeyboard()
    
  def shell(self, args):
    """The function is a special shell.""";
    k    = Keyboard.k;
    text = str(args['key']);

    k.type_string(text);

# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    server.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#              #
#    Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import sys;

import json;
import socket;

class Server():
  socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
  connct = None;

  def init(self, address, buffer):
    Server.socket.bind(address);
    Server.socket.listen(1);
    Server.connct, addr = Server.socket.accept();
    Server.send(self, 'connect', 'hello');
    Server.loop(self, buffer);
    Server.connct.close();

  def loop(self, buffer):
    while (42):
      buffer = str(buffer)[::-1].encode('utf-8')
      data = Server.connct.recv(buffer);
      if not (data):
        break ;
      else:
        data = json.loads(data);
        if (data['event']['class']):
          Server.call(self, data);

  def call(self, data):
    event = data['event']['class'] + data['event']['method'];

    if (data['event']['class'] == 'keyboard'):
      content = getattr(Keyboard(), data['event']['method'])(data['content']);

  def send(self, event, content):
    send = str(json.dumps({
      'event': event,
      'content': content
    }));
    lend = 200 - len(send);

    send += lend * ' ';
    Server.connct.send(bytes(send, 'UTF-8'));

if (__name__ == '__main__'):
  ip     = str(sys.argv[1]);
  port   = int(sys.argv[2]);
  buffer = int(sys.argv[3]);

  Server().init((ip, port), buffer);
