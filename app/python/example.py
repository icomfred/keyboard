"""
A script to illustrate PyKeyboard use
"""

import pykeyboard
import time

k = pykeyboard.PyKeyboard()

def press_and_hold(character, hold_time):
    k.press_key(character)
    time.sleep(hold_time)
    k.release_key(character)

k.type_string('hééél')
k.type_string('\n')
#press_and_hold('W', 1)
