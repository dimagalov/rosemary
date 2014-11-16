'''
Declaration of Point(x, y), one of the basic structures needed
'''
class Point:
    def __init__(self, _x = 0, _y = 0):
        self.x = _x
        self.y = _y

    def __add__(self, _vector):
        return Point(self.x + _vector.x, self.y + _vector.y)

    def __iadd__(self, _vector):
        self.x += _vector.x
        self.y += _vector.y


'''
Declaration of fakePoint, used instead of Point in the holes
'''
class FakePoint(Point):
    def __init__(self):
        Point.__init__(self, 0, 0)