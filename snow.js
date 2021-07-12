class Snow {  
    constructor() {
      this.radius = 3;
      this.xPosition = 0;
      this.yPosition = 0;
    }
    
    display() {
      ellipse(this.xPosition, this.yPosition, this.radius);
    }
  }