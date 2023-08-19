export class Point {
    constructor(id, name, total) {
        this._id = id;
        this._name = name;
        this._total = total;
        
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get total() {
        return this._total;
    }
    // get location() {
    //     return this.location;
    // }
    // get coordinates() {
    //     return this.coordinates;
    // }
}
  
  export class MarkedPoints {
      constructor() {
          this._points = [];
      }
      add(id, name, total) {
          this._points.push(
              new Point(id, name, total)
          );
      }

      find(name) {
          for (let point of this._points) {
              if (point._name === name) {
                  return point;
              }
          }
          return null;
      }
      get points() {
          return this._points;
      }
  }
  