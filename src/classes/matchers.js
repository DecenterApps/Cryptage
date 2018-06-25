import { getCardTypeConstructor } from './Registry';

export const isActiveCard = createMatcher({});
export const isAvailableCard = createMatcher({ active: false });
export const isRootCard = createMatcher({ parent: null });
export const isLocationCard = createMatcher({ cardType: 'Location' });
export const isProjectCard = createMatcher({ cardType: 'Project' });

export function createIdentityMatcher(value) {
  return (x) => x === value;
}

export function createDisjunctiveMatcher(query) {

  if (typeof query === 'function') return query;
  if (!query || typeof query !== 'object') return createIdentityMatcher(query);

  if (Array.isArray(query)) {
    return (value) => Array.isArray(value) ?
      query.some(item => value.indexOf(item) !== -1) :
      query.indexOf(value) !== -1
  }

  // NB: disjunctive matcher should not match *any* active card by default
  return createMatcher({ active: () => false, ...query, $op: '||' });
}

export function combineMatchers(...queries) {
  const matchers = queries.map(query => createMatcher(query));
  return (card) => matchers.every(matches => matches(card));
}

export function createMatcher(query) {

  if (typeof query === 'function') return query;
  if (!query || typeof query !== 'object') return createIdentityMatcher(query);

  if (Array.isArray(query)) {
    return (value) => Array.isArray(value) ?
      query.every(item => value.indexOf(item) !== -1) :
      query.indexOf(value) !== -1
  }

  const matchers = {...query};
  let anyTypeConstructor = 'any';

  if (typeof matchers.active === 'undefined') {
    matchers.active = true;
  }
  if (typeof matchers.cardType === 'undefined') {
    matchers.cardType = anyTypeConstructor;
  }

  const { $op, cardType, parent, anyParent, ...props } = matchers;
  const conjunctive = $op !== '||';
  let typeConstructor = cardType;

  const propNames = Object.keys(props);
  for (const prop of propNames) {
    props[prop] = conjunctive ? createMatcher(props[prop]) : createDisjunctiveMatcher(props[prop]);
  }

  let parentMatcher = false;
  if (parent === null) {
    parentMatcher = (cardParent) => !cardParent;
  } else if (typeof parent !== 'undefined') {
    parentMatcher = conjunctive ? createMatcher(parent) : createDisjunctiveMatcher(parent);
  }

  let anyParentMatcher = false;
  if (typeof anyParent !== 'undefined') {
    anyParentMatcher = conjunctive ? createMatcher(anyParent) : createDisjunctiveMatcher(anyParent);
  }

  let result;
  const test = (expr) => {
    result = !conjunctive;
    return expr ? result : conjunctive;
  };

  return (card) => {

    if (!card) return false;

    if (typeof typeConstructor === 'string') {
      typeConstructor = getCardTypeConstructor(typeConstructor);
    }

    if (typeof anyTypeConstructor === 'string') {
      anyTypeConstructor = getCardTypeConstructor(anyTypeConstructor);
    }

    if (typeConstructor !== anyTypeConstructor && test(card instanceof typeConstructor)) {
      return result;
    }

    for (const prop of propNames) {
      if (test(props[prop](card[prop], card, prop))) {
        return result;
      }
    }

    if (parentMatcher && test(parentMatcher(card.parent))) {
      return result;
    }

    if (anyParentMatcher) {
      let parent = card.parent;
      while (parent) {
        if (anyParentMatcher(parent)) return true;
        parent = parent.parent;
      }
      if (!parent) return false;
    }

    return conjunctive;
  };
}
