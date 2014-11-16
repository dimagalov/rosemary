/**
 * Very important constant, which is
 * responsible for float comparison precision
 */
var eps = 0.0000001;

/**
 * Returns true if two numbers have
 * different signs and false otherwise
 */
var differentSigns = function (a, b) {
    return (a >= 0 && b <= 0 || a <= 0 && b >= 0);
};

/**
 * Counts oriented triangle area
 */
var triangleArea = function(a, b, c) {
    return crossProduct(buildVector(a, b), buildVector(a, c)) / 2;
};

/**
 * Checks that projections of segments on one of the axes intersect
 */
var projectionsIntersect = function(a, b, c, d) {
    if (a > b)
        b = [a, a = b][0]; // swap(a, b)
    if (c > d)
        d = [c, c = d][0]; // swap(c, d)
    return Math.max(a, c) <= Math.min(b, d);
};

/**
 * Checks if the Point is on the Segment, where 
 * the Segment is represented as pair of Points
 * p - point to be checked
 * a, b - ends of the segment
 */
var pointOnVector = function (p, a, b) {
    // we should check, that p is on both rays: ab and ba

    // check, that p in on the ray ab
    var on_ab = Math.abs(crossProduct(buildVector(a, p), buildVector(a, b))) < eps && dotProduct(buildVector(a, p), buildVector(a, b)) > eps;

    // check, that p in on the ray ba
    var on_ba = Math.abs(crossProduct(buildVector(b, p), buildVector(b, a))) < eps && dotProduct(buildVector(b, p), buildVector(b, a)) > eps;

    return on_ab && on_ba;
};

/**
 * Checks if two Segments intersect, where
 * each of them is represented as pair of Points
 * a, b - ends of the first segment
 * c, d - ends of the first segment
 */
var segmentsIntersect = function (a, b, c, d) {
    return differentSigns(triangleArea(a, b, c), triangleArea(a, b, d)) && // c and d are on different sides relatively to line ab
           differentSigns(triangleArea(c, d, a), triangleArea(c, d, b)) && // a and b are on different sides relatively to line cd
           projectionsIntersect(a.x, b.x, c.x, d.x) &&                     // projections on x-axis intersect
           projectionsIntersect(a.y, b.y, c.y, d.y);                       // projections on y-axis intersect
};

/**
 * Returns pseudorandom number from [a, b]
 */
var randNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};