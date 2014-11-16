/**
 * Declaration of Snake, the main structure we will operate with
 */
var Snake = function(canvas, color, ucolor) {

    /* Canvas attributes */
    this.canvas        = canvas;
    this.canvas_width  = parseInt(canvas.prop("width"), 10);
    this.canvas_height = parseInt(canvas.prop("height"), 10);

    /* Initaial values of Snake's attributes */
    this.color    = color;                                                // color of the snake
    this.ucolor   = ucolor;                                               // color of snake, while it's digging a hole
    this.position = new Point(randNumber(100, this.canvas_width - 100),
                              randNumber(100, this.canvas_height - 100)); // initial position of the snake
    this.angle    = Math.random() * Math.PI * 2;                          // initial direction of movement
    this.points   = [this.position];                                      // array of all Snake's points

    /*  Motion Constants  */
    this.cangle       = 0.1;  // rotation angle
    this.cspeed       = 3.5;  // motion speed
    this.choleprob    = 0.08; // probability of new hole to appear
    this.chole        = 0;    // length of the current hole (can be negative, if the Snake is tangible now)
    this.choleborder  = -10;  // if this.chole < this.choleborder, then we can create new hole
    this.choleminsize = 5;    // minimal hole size
    this.cholemaxsize = 10;   // maximal hole size

    /**
    * Updates Snake's state according to the current movement direction
    */
    this.update = function (direction) {
        // we don't won't to draw a hole by default
        --this.chole;

        // memorize the previous position
        previous = this.position;

        // calculate new angle according to current direction
        this.angle += direction * this.cangle;

        // angle should be in [0; 2 * pi] range
        if (this.angle < 0)
            this.angle += 2 * Math.PI;
        if (this.angle >= 2 * Math.PI)
            this.angle -= 2 * Math.PI;

        // calculate new position
        this.position = shiftPoint(this.position, rotateVector(new Vector(0, this.cspeed), this.angle));

        // if we are in a hole now or we want to create one and random allows us to do so
        if (this.chole > 0 || (this.chole < this.choleborder && Math.random() < this.choleprob)) {
            // then we should add new fakePoint to our snake
            this.points.push(new fakePoint());

            // if we created a new hole, then we should choose it's length
            if (this.chole < this.choleborder) {
                this.chole = randNumber(this.choleminsize, this.cholemaxsize + 1);
            }

            // draw invisible the part of the Snake from previous position to current
            this.canvas.drawLine({
                strokeStyle: this.ucolor,                // the hole is invisible, so the colour is equal to the canvas colour
                strokeWidth: 5,                          // width of the Snake
                rounded: true,                           // our Snake should look pretty
                x1: previous.x, y1: previous.y,          // one end of the segment
                x2: this.position.x, y2: this.position.y // other end of the segment
            });
        }
        else {
            // draw visible the part of the Snake from previous position to current
            this.points.push(this.position);
            this.canvas.drawLine({
                strokeStyle: this.color,                 // snake is visible, so the colour is equal to the Snake colour
                strokeWidth: 5,                          // width of the Snake
                rounded: true,                           // our Snake should look pretty
                x1: previous.x, y1: previous.y,          // one end of the segment
                x2: this.position.x, y2: this.position.y // other end of the segment
            });
        }
    };
};