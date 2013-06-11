segment-tree
============
A minimal implementation of a segment tree for storing run-length encoded arrays with updates.

## Example

```javascript
var tree = require("segment-tree").zeros(10)

tree.set(1, 1)
tree.set(2, 1)

console.log(tree.length)
console.log(tree.pointers)
console.log(tree.values)
```

## Install

    npm install segment-tree

## API

```javascript
var SegmentTree = require("segment-tree")
```

### `SegmentTree(length, pointers, values)`
SegmentTree constructor

* `length` is the size of the segment tree
* `pointers` is a sorted list of pointers
* `values` is a sorted list of values

The segment tree object has the same properties as the arguments.

### `SegmentTree.proto.get(index)`
Retrieves the value `index`

* `index` is the coordinate of the value to retrieve

**Returns** The value at `index`

### `SegmentTree.proto.set(index, v)`
Sets the value at `index` to `v`

* `index` is the index to update
* `v` is the new value

**Returns** `v`

### `SegmentTree.proto.slice([begin, end])`

### `SegmentTree.proto.toArray([array])`
Unpacks the segment tree into an array

* `array` gets the output.  If not specified a new array is allocated

**Returns** `array`

### `SegmentTree.zeros(size)`
Create an empty segment tree

* `size` is the size of the new segment tree

**Returns** A new segment tree

### `SegmentTree.fromArray(array)`
Encodes an array into a segment tree

* `array` is the array to encode

**Returns** A new segment tree encoding `array`

## Credits
(c) 2013 Mikola Lysenko. MIT License