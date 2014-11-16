'''
Decloration of Vector, one of the basic structures needed
'''

import math

class Vector:
    def __init__(self, _arg1, _arg2):
        if type(_arg1) in [int, float]:
            self.x = _arg1
            self.y = _arg2
        else:
            self.x = _arg2.x - _arg1.x
            self.y = _arg2.y - _arg1.y

def crossProduct(_v1, _v2):
    return _v1.x * _v2.y - _v1.y * _v2.x

def dotProduct(_v1, _v2):
    return _v1.x * _v2.x + _v1.y * _v2.y


'''
Rotates vector for a current angle
'''
def rotateVector(_v, _angle):
    return Vector(_v.x * math.cos(_angle) - _v.y * math.sin(_angle), _v.x * math.sin(_angle) + _v.y * math.cos(_angle))
