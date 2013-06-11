"use strict"

function lowerBound(array, idx) {
  var n = array.length|0
  var hi = n-1
  var lo = 0
  var mid
  var v
  while(hi > lo) {
    mid = (hi + lo)>>>1
    v = array[mid]
    if(v < idx) {
      lo = mid + 1
    } else if(v > idx) {
      hi = mid - 1
    } else {
      return mid
    }
  }
  return lo
}

function SegmentTree(size, pointers, values) {
  this.size = size
  this.pointers = pointers
  this.values = values
}

SegmentTree.prototype.get = function(y) {
  return this.values[lowerBound(this.pointers, y)]
}

SegmentTree.prototype.set = function(y, v) {
  var pointers = this.pointers
  var values = this.values
  var ptr = lowerBound(pointers, y)
  var iv = values[ptr]
  if(iv !== v) {
    var n = pointers.length
    var size = this.size
    var start = pointers[ptr]
    var end = ptr+1 < n ? pointers[ptr+1] : size
    if(y === start) {
      if(start + 1 === end) {
        values[ptr] = v
        if(ptr+1 < n && values[ptr+1] === v) {
          if(ptr > 0 && values[ptr-1] === v) {
            values.splice(ptr, 2)
            pointers.splice(ptr, 2)
          } else {
            values.splice(ptr, 1)
            pointers.splice(ptr+1, 1)
          }
        } else if(ptr > 0 && values[ptr-1] === v) {
          values.splice(ptr, 1)
          pointers.splice(ptr, 1)
        }
      } else if(ptr > 0 && values[ptr-1] === v) {
        ++pointers[ptr]
      } else {
        values.splice(ptr, 0, v)
        pointers.splice(ptr+1, 0, y+1)
      }
    } else if(y+1 === end) {
      if(ptr+1 < n && values[ptr+1] === v) {
        --pointers[ptr+1]
      } else {
        values.splice(ptr+1, 0, v)
        pointers.splice(ptr+1, 0, y)
      }
    } else {
      values.splice(ptr+1, 0, v, iv)
      pointers.splice(ptr+1, 0, y, y+1)
    }
  }
  return v
}
module.exports = SegmentTree

function makeEmptyTree(size) {
  return new SegmentTree(size, [0], [0])
}
module.exports.zeros = makeEmptyTree
