class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class LRUCache {
  constructor() {
    this.cache = {};
    this.size = 0;
    this.limit = 20;
    this.head = null;
    this.tail = null;
  }
  // getSize() {
  //   console.log('size is', this.size);
  // }
  // getHead() {
  //   console.log('THIS.HEAD IS', this.head.value);
  //   return this.head;
  // }
  // getTail() {
  //   console.log('THIS.TAIL IS', this.tail.value);
  //   return this.tail;
  // }
  set(key, value) {
    this.checkLimit();
    if (!this.head) {
      this.head = this.tail = new Node(key, value);
    } else {
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }
    this.cache[key] = this.head;
    this.size += 1;
  }

  get(key) {
    if (this.cache[key]) {
      console.log(this.cache[key]);
      const value = this.cache[key].value;
      this.delete(key);
      this.set(key, value);
      return value;
    }
    return null;
  }

  delete(key) {
    if (!this.cache.hasOwnProperty(key)) return null;
    const node = this.cache[key];
    if (node === this.head) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      [node.next.prev, node.prev.next] = [node.prev, node.next];
    }
    delete this.cache[key];
    this.size -= 1;
  }
  checkLimit() {
    if (this.size === this.limit) {
      this.delete(key);
    }
  }
}

const cache = new LRUCache();
// cache.set('a', 'a');
// cache.set('a', 'b');
// console.log(cache.get('a'));
// cache.set('c', 'c');
// cache.set('d', 'd');
// cache.delete('c');
// cache.delete('x');
// cache.getSize();

module.exports = cache;
