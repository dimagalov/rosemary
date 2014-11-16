from point import *
from vector import *

'''
Constant for float comparsion
'''
eps = 10**-7


'''
True if _a, _b have different signes
'''
def differentSigns(a, b):
    return (a >= 0 and b <= 0) or (a <= 0 and b >= 0)


'''
Returns oriented square of trianle
'''
def triangleArea(_p1, _p2, _p3):
    return crossProduct(Vector(_p1, _p2), Vector(_p1, _p3)) / 2.0


'''
Checks if two segments of one line intersects
'''
def projectionsIntersect(_x1, _x2, _x3, _x4):
    _x1, _x2 = min(_x1, _x2), max(_x1, _x2)
    _x3, _x4 = min(_x3, _x4), max(_x3, _x4)
    return max(_x1, _x3) <= min(_x2, _x4)


'''
Checks if point _x belongs to the segment with ends _p1, _p2
'''
def pointOnVector(_x, _p1, _p2):
    on_ab = abs(crossProduct(Vector(_p1, _x), Vector(_p1, _p2))) < eps and dotProduct(Vector(_p1, _x), Vector(_p1, _p2)) > eps
    _p1, _p2 = _p2, _p1
    on_ba = abs(crossProduct(Vector(_p1, _x), Vector(_p1, _p2))) < eps and dotProduct(Vector(_p1, _x), Vector(_p1, _p2)) > eps
    return on_ab and on_ba

'''
Checks if two segments intersects
'''
def segmentsIntersect(a, b, c, d):
    return differentSigns(triangleArea(a, b, c), triangleArea(a, b, d)) and differentSigns(triangleArea(c, d, a), triangleArea(c, d, b)) and projectionsIntersect(a.x, b.x, c.x, d.x) and projectionsIntersect(a.y, b.y, c.y, d.y)