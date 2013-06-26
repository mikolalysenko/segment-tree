var SegmentTree = require("../segtree.js")

require("tape")("segment-tree", function(t) {
  var tree = SegmentTree.zeros(10)
  
  t.same(tree.get(5), 0)
  
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
  
  var tree3 = SegmentTree.zeros(10)
  tree3.set(8, 1)
  tree3.set(9, 1)
  t.same(tree3.pointers, [0,8])
  t.same(tree3.values, [0,1])
  
  tree3.set(7,1)
  t.same(tree3.pointers, [0,7])
  t.same(tree3.values, [0,1])
  
  var x = [1,1,1,0,1,2,2,3,1,0,0,0]
  var y = SegmentTree.fromArray(x)
  t.same(y.toArray(), x)
  
  var q = y.slice(3, -4)
  t.same(q.toArray(), [0,1,2,2,3])

  var x = [1,1,1,0,1,2,2,3,1,0,0,0]
  var y = SegmentTree.fromGenericArray(new Int32Array(x))
  t.same(y.toArray(), x)
  
  
  t.end()
})