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
    print(pid);
    win32gui.SetForegroundWindow(pid);

Gui().back();

