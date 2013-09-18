(function () {
    
    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');
    
    console.log("canvas: ", canvas);
    console.log("context: ", ctx);
        
    function Point (x, y) {
        this.x = x;
        this.y = y;
    }
    
    function Rectangle (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    function Star (context, numPoints, boundingRect, fillStyle, strokeStyle) { 
        var self = this;
        
        this.numPoints = numPoints;
        this.x = boundingRect.x;
        this.y = boundingRect.y;
        this.width = boundingRect.width;
        this.height = boundingRect.height;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        
        
        var toRadians = function (degrees) {
            return degrees * (Math.PI / 180);
        };
        
        var toDegrees = function (radians) {
            return radians *  (180 / Math.PI); 
        };
            
        var square = function (x) {
            return x * x;
        };
        
        var calculatePoints = function (origin, radius, numPoints, angleOffset) {
            
            var points = [];
            
            var pointAngle = (360 / numPoints);   
            for (var i = 0; i < numPoints; i++) {
            
                var currentPointAngle = toRadians((pointAngle * i) + angleOffset);
                var currentPointY = Math.sin(currentPointAngle) * radius;
                var currentPointX = Math.cos(currentPointAngle) * radius;
                
                points.push(new Point(currentPointX + origin.x, currentPointY + origin.y));
            }
            
            return points;
        };
        
        var interpolatePoints = function (pointArray1, pointArray2) {
            var interpolatedPoints = [];
            
            pointArray1.forEach(function (p, index) {
                interpolatedPoints.push(p);
                interpolatedPoints.push(pointArray2[index]);
            });
            
            return interpolatedPoints;
        };
        
        this.draw = function (starPoints) {
            
            var radius = self.height / 2;
        
            var outerPoints = calculatePoints(new Point(self.x + self.width/2, self.y + self.height/2), radius, self.numPoints, 0);
            var innerPoints = calculatePoints(new Point(self.x + self.width/2, self.y + self.height/2), radius/2, self.numPoints, (360/numPoints) / 2);
            var starPoints = interpolatePoints(outerPoints, innerPoints);
            
            context.fillStyle = self.fillStyle;
            context.strokeStyle = self.strokeStyle;
            context.beginPath();
            context.moveTo(starPoints[0].x, starPoints[0].y);

            starPoints.forEach(function (p) {
                context.lineTo(p.x, p.y);
            });

            context.closePath();
            context.stroke();
        };
        
    }
    
    // intentionally global so we can get at it in console:
    testStar = new Star(ctx, 8, new Rectangle(100, 100, 200, 200), "#000000", "#000000");
    
    
    
    
    
    
    
    
    
    
    
        
})();