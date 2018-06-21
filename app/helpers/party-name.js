import { helper } from '@ember/component/helper';

const SHORT_MAP = {
  'dem': {
    short: 'dem',
    adj: 'Democratic',
    formal: 'Democrat',
    symbol: '(D)',
    lowercaseF: 'democrat',
  },
  'rep': {
    short: 'rep',
    adj: 'Republican',
    formal: 'Republican',
    symbol: '(R)',
    lowercaseF: 'republican',
  },
  'green': {
    short: 'green',
    adj: 'Green',
    formal: 'Green',
    symbol: '(G)',
  },
  'ind': {
    short: 'ind',
    adj: 'Independent',
    formal: 'Independent',
    symbol: '(I)',
  },
};

const FORMAL_MAP = {
  'Democrat': {
    short: 'dem',
    adj: 'Democratic',
    formal: 'Democrat',
    symbol: '(D)',
    lowercaseF: 'democrat',
  },
  'Republican': {
    short: 'rep',
    adj: 'Republican',
    formal: 'Republican',
    symbol: '(R)',
    lowercaseF: 'republican',
  },
  'Green': {
    short: 'green',
    adj: 'Green',
    formal: 'Green',
    symbol: '(G)',
  },
  'Independent': {
    short: 'ind',
    adj: 'Independent',
    formal: 'Independent',
    symbol: '(I)',
  },
};

export function partyName([ input, type ]/*, hash*/) {
  if (FORMAL_MAP[input]) {
    return FORMAL_MAP[input][type];
  } else if (SHORT_MAP[input]) {
    return SHORT_MAP[input][type];
  }
}

export default helper(partyName);
