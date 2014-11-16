/**
 * Declaration of Point(x, y), one of the basic structures needed
 */
var Point = function(x, y) {
    this.x = x; // coordinate by x-axis
    this.y = y; // coordinate by y-axis
};

/**
 * Shift Point on Vector
 */
var shiftPoint = function(p, v) {
    // we should add x and y coordiantes of vector
    // respectively to x and y coordiantes of point
    return new Point(p.x + v.x, p.y + v.y);
};