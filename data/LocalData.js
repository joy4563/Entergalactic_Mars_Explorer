export class Point {
    constructor(id, name, details, location, coordinates) {
        this._id = id;
        this._name = name;
        this._details = details;
        this._location = location;
        this._coordinates = coordinates;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get details() {
        return this._details;
    }
    get location() {
        return this.location;
    }
    get coordinates() {
        return this.coordinates;
    }
}
  
  export class MarkedPoints {
      constructor() {
          this._points = [];
      }
      add(id, name, details, location, coordinates) {
          this._points.push(
              new Point(id, name, details, location, coordinates)
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
  