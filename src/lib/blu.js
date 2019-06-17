class StateManager {
  constructor() {
    this._channels = new Map();
    this.data = {};
  }

  subscribe(channel, callback) {
    // store callbacks in a channel
    let ptr = this._channels.get(channel);
    if (typeof ptr === 'undefined') {
      ptr = {
        index: 0,
        cb: new Map()
      }
      this._channels.set(channel, ptr);
    };
    // increment pointer and store callback at that slot
    let subIndex = ptr.index++;
    ptr.cb.set(subIndex, callback);
    // return index for unsubscription
    return subIndex;
  }

  unsubscribe(channel, subIndex) {
    // check if channel is defined
    let ptr = this._channels.get(channel);
    if (typeof ptr == 'undefined') {
      return
    };
    // delete specified index to prevent it from being called
    ptr.cb.delete(subIndex);
    if (ptr.cb.size === 0) {
      this._channels.delete(channel)
    }
    return
  }

  publish(channel, data) {
    // check if channel exists
    let ptr = this._channels.get(channel);
    if (typeof ptr === 'undefined') {
      return
    };
    // fire all the stored callbacks
    for (let cb of ptr.cb.values()) {
      cb(data);
    }
  }
}

module.exports = { StateManager }