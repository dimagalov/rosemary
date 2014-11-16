/**
 * Declaration of Vector(x, y), one of the basic structures needed
 */
var Vector = function(x, y) {
    this.x = x; // coordinate by x-axis
    this.y = y; // coordinate by y-axis
};

/**
 * Build Vector by two Points
 */
var buildVector = function(begin, end) {
    // we should substract x and y coordiantes of Point begin
    // respectively from x and y coordiantes of Point end
    return new Vector(end.x - begin.x, end.y - begin.y);
};

/**
 * Implementation of crossproduct for two vectors
 */
var crossProduct = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
};

/**
 * Implementation of dot product for two vectors
 */
var dotProduct = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

/**
 * Rotates vector for a current angle
 */
var rotateVector = function (v, angle) {
    // while rotating Vector, we change the coordinates according to the rotation matrix
    return new Vector(v.x * Math.cos(angle) - v.y * Math.sin(angle), v.x * Math.sin(angle) + v.y * Math.cos(angle));
};
