import serialise from 'serialijse';

const subscriptions = Symbol('subscriptions');

export default class Subscriber {

  constructor() {
    this[subscriptions] = new Set();
  }

  subscribe(state, event, matcher, callback) {
    const subscription = state.subscribe(event, matcher, callback);
    this[subscriptions].add(subscription);
    return subscription;
  }

  unsubscribeAll() {
    for (const unsubscribe of this[subscriptions]) {
      unsubscribe();
    }
    this[subscriptions].clear();
  }
}

serialise.declarePersistable(Subscriber);
