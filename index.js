"use strict"

function lowerBound(array, idx) {
  var n = array.length|0
  var hi = n-1
  var lo = 0
  var mid
  var v
  while(lo <= hi) {
    mid = (hi + lo)>>>1
    v = array[mid]
    if(v === idx) {
      return mid
    } else if(v < idx) {
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return hi
}

function SegmentTree(length, pointers, values) {
  this.length = length
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
    var size = this.length
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

SegmentTree.prototype.toArray = function(array) {
  var size = this.length
  if(!array) {
    array = new Array(size)
  } else if(array.length !== size) {
    throw new Error("Length mismatch")
  }
  if(size === 0) {
    return
  }
  var values = this.values
  var pointers = this.pointers
  var n = this.values.length
  var i, j, start, end, v
  for(i=0; i+1<n; ++i) {
    start = pointers[i]
    end = pointers[i+1]
    v = values[i]
    for(j=start; j<end; ++j) {
      array[j] = v
    }
  }
  v = values[n-1]
  for(j=pointers[n-1]; j<size; ++j) {
    array[j] = v
  }
  return array
}

SegmentTree.prototype.slice = function(start, end) {
  if(start === undefined) {
    start = 0
  } else if(start < 0) {
    start = this.length+start
  }
  if(end === undefined) {
    end = this.length
  } else if(end < 0) {
    end = this.length+end
  }  
  var pointers = this.pointers
  var values = this.values
  var a = lowerBound(pointers, start)
  var b = lowerBound(pointers, end)
  if(pointers[b] < end) {
    ++b
  }
  var opointers = pointers.slice(a,b)
  var ovalues = values.slice(a,b)
  var i, n=opointers.length
  opointers[0] = 0
  for(i=1; i<n; ++i) {
    opointers[i] -= start
  }
  return new SegmentTree(end - start, opointers, ovalues)
}
module.exports = SegmentTree

function makeEmptyTree(size) {
  return new SegmentTree(size, [0], [0])
}
module.exports.zeros = makeEmptyTree

function fromArray(array) {
  if(array.length === 0) {
    return new SegmentTree(0, [], [])
  }
  var values = [array[0]]
  var pointers = [0]
  var size = array.length
  for(var i=1; i<size; ++i) {
    if(array[i] !== array[i-1]) {
      values.push(array[i])
      pointers.push(i)
    }
  }
  return new SegmentTree(size, pointers, values)
}
module.exports.fromArray = fromArray
