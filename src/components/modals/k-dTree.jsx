// kdTree.js

class Node {
    constructor(point, axis, left = null, right = null) {
      this.point = point;
      this.axis = axis;
      this.left = left;
      this.right = right;
    }
  }
  
  class KdTree {
    constructor(points, depth = 0) {
      if (points.length === 0) {
        this.root = null;
      } else {
        const axis = depth % 2; // assuming 2D points
        points.sort((a, b) => a[axis] - b[axis]);
        const medianIndex = Math.floor(points.length / 2);
        this.root = new Node(
          points[medianIndex],
          axis,
          new KdTree(points.slice(0, medianIndex), depth + 1),
          new KdTree(points.slice(medianIndex + 1), depth + 1)
        );
      }
    }
  
    nearest(point) {
      let best = null;
  
      const findNearest = (node, target, depth = 0) => {
        if (!node) return;
  
        const axis = depth % 2;
        const current = node.point;
        const nextBranch = target[axis] < current[axis] ? node.left : node.right;
        const otherBranch = target[axis] < current[axis] ? node.right : node.left;
  
        findNearest(nextBranch, target, depth + 1);
  
        const currentDistance = distance(current, target);
        if (!best || currentDistance < distance(best, target)) {
          best = current;
        }
  
        if (Math.abs(target[axis] - current[axis]) < distance(best, target)) {
          findNearest(otherBranch, target, depth + 1);
        }
      };
  
      findNearest(this.root, point);
  
      return best;
    }
  }
  
  const distance = (a, b) => {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  };
  
  export default KdTree;
  