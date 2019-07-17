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
  getSize() {
    console.log('size is', this.size);
  }
  getHead() {
    console.log('THIS.HEAD IS', this.head.value);
    return this.head;
  }
  getTail() {
    console.log('THIS.TAIL IS', this.tail.value);
    return this.tail;
  }
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
    return this.head;
  }
  setLibrary(spotifyID, library) {
    const cachedUser = this.get(spotifyID);
    const libraryArray = library.map(song => {
      const { track } = song;
      const songID = track ? track.id : song.spotify_id;
      return {
        id: songID,
        dateAdded: song.added_at || song.date_added,
        title: song.track_title || track.name,
        artist: song.artist || track.artists,
      };
    });
    cachedUser.library = libraryArray;
    this.set(spotifyID, cachedUser);
  }
  setLibraryFeatures(spotifyID, library) {
    const cachedUser = this.get(spotifyID);
    library.forEach(song => {
      const songObject = cachedUser.library[song.id];
      const updatedObject = {
        ...songObject,
        acousticness: song.acousticness,
        danceability: song.danceability,
        energy: song.energy,
        instrumentalness: song.instrumentalness,
        loudness: song.loudness,
        tempo: song.tempo,
        valence: song.valence,
      };
      songObject = updatedObject;
    });
    this.set(spotifyID, cachedUser);
  }

  get(key) {
    if (!this.cache[key]) return null;

    const value = this.cache[key].value;
    this.delete(key);
    this.set(key, value);
    return value;
  }

  delete(key) {
    if (!this.cache[key]) return null;
    const node = this.cache[key];

    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    delete this.cache[key];
    this.size -= 1;
  }
  checkLimit() {
    if (this.size === this.limit) {
      this.delete(key);
    }
  }

  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }
}

const cache = new LRUCache();
// cache.set('a', 'a');
// cache.set('c', 'c');
// cache.set('d', 'd');
// cache.getHead();
// console.log(cache.get('a'));
// cache.getHead();
// cache.delete('c');
// cache.getSize();

module.exports = cache;
