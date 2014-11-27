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

import win32com.client

class Keyboard():
  """The class Keyboard is a simple library of basing functions.""";
  w32 = win32com.client.Dispatch("WScript.Shell");
    
  def shell(self, args):
    """The function is a special shell.""";
    shell = Keyboard.w32;
    key   = str(args['key']);

    shell.SendKeys(key);

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
    Server.connct.send(send);

if (__name__ == '__main__'):
  ip = str(sys.argv[1]);
  port = int(sys.argv[2]);
  buffer = int(sys.argv[3]);

  Server().init((ip, port), buffer);
