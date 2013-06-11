var SegmentTree = require("../index.js")

require("tape")("segment-tree", function(t) {

  var tree = SegmentTree.zeros(10)
  
  tree.set(1, 1)
  t.same(tree.pointers, [0,1,2])
  t.same(tree.values, [0,1,0])
  
  tree.set(2, 1)
  t.same(tree.pointers, [0,1,3])
  t.same(tree.values, [0,1,0])
  
  tree.set(4, 1)
  t.same(tree.pointers, [0,1,3,4,5])
  t.same(tree.values, [0,1,0,1,0])
  
  tree.set(3, 1)
  t.same(tree.pointers, [0,1,5])
  t.same(tree.values, [0,1,0])
  
  tree.set(9, 1)
  t.same(tree.pointers, [0,1,5,9])
  t.same(tree.values, [0,1,0,1])
  
  tree.set(0, 1)
  t.same(tree.pointers, [0,5,9])
  t.same(tree.values, [1,0,1])

  var tree2 = SegmentTree.zeros(10)
  tree2.set(0, 1)
  t.same(tree2.pointers, [0,1])
  t.same(tree2.values, [1,0])
  
  t.end()
})