# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    gui.py                                             :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2014/09/15 10:02:36 by adjivas           #+#    #+#              #
#    Updated: 2014/09/15 10:02:36 by adjivas          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import win32gui;

def enum_callback(pid, list):
  if win32gui.IsWindowVisible(pid):
    list.append(pid);

class Gui():
  list = [];

  def __init__(self):
    win32gui.EnumWindows(enum_callback, Gui.list);

  def back(self):
    pid = None;

    for pid in range(len(Gui.list)):
      if win32gui.GetWindowText(Gui.list[pid]) == '':
        break ;
    pid = Gui.list[pid + 2];
    Gui.list = [];
    Gui.to(self, pid);

  def to(self, pid):
    win32gui.SetForegroundWindow(pid);

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
import win32api;
import win32con;
import win32com.client

class Keyboard():
  """The class Keyboard is a simple library of basing functions.""";
  py  = pykeyboard.PyKeyboard();
  w32 = win32com.client.Dispatch("WScript.Shell");

  def press(self, args):
    """The function press the key.""";
    py     = Keyboard.py;
    key    = str(args['key']);

    if (len(key) != 1):
      key += '_key';
      key  = int(py.__dict__[key]);
    else:
      key  = str(key);
    py.press_key(key);

  def release(self, args):
    """The function release the key.""";
    py  =  Keyboard.py;
    key =  str(args['key']);

    if (len(key) != 1):
      key += '_key';
      key  = int(py.__dict__[key]);
    else:
      key  = str(key);
    py.release_key(key);

  def tap(self, args):
    """The function press and release the key.""";
    py  =  Keyboard.py;
    key =  str(args['key']);

    if (len(key) != 1):
      key += '_key';
      key  = int(py.__dict__[key]);
    else:
      key  = str(key);
    py.tap_key(key);

    
  def shell(self, args):
    """The function is a special shell.""";
    shell = Keyboard.w32;
    key   = str(args['key']);

    Gui().back();    
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
