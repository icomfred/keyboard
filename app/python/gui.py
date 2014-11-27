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
      print(pid, win32gui.GetWindowText(Gui.list[pid]));
      if win32gui.GetWindowText(Gui.list[pid]) == '':
        break ;
    pid = Gui.list[pid + 1];
    Gui.list = [];
    Gui.to(self, pid);

  def to(self, pid):
    win32gui.SetForegroundWindow(pid);

if (__name__ == '__main__'):
  Gui().back();
