export class Point {
    constructor(id, name, details) {
      this._id = id;
      this._name = name;
      this._details = details;
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
  }
  
  export class MarkedPoints {
    constructor() {
      this._points = [];
    }
    add(id, name, details) {
      this._points.push(new Point(id, name, details));
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
  