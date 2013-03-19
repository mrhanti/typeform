module("Array")
test("should return -1 for non-found values", function() {
  equal([1,2,3].indexOf(5), -1, "right value");
  equal([1,2,3].indexOf(2), 1, "right value");
});
