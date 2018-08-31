import test from 'ava';
import {
  removeLeadingNumber,
  humanizesSlug,
  strToSlug,
  getBasename,
  getExtension,
} from '../src/helpers';

test('test removeLeadingNumber function', (t) => {
  // it should remove the leading number
  t.is(removeLeadingNumber('0_ThisIsATest'), 'ThisIsATest');
  t.is(removeLeadingNumber('000_ThisIsATest'), 'ThisIsATest');
  t.is(removeLeadingNumber('12345_FAQ'), 'FAQ');
  t.is(removeLeadingNumber('09870_FAQ'), 'FAQ');
  t.is(removeLeadingNumber('-1_FAQ'), '-1_FAQ');
  t.is(removeLeadingNumber('_FAQ'), '_FAQ');
  t.is(removeLeadingNumber('ThisIsATest'), 'ThisIsATest');
});

test('test humanizesSlug function', (t) => {
  // it should humanize slug
  // t.is(humanizesSlug('0_ThisIsATest'), 'This Is A Test');
  t.is(humanizesSlug('12345_FAQ'), 'FAQ');
  t.is(humanizesSlug('-1_FAQ'), '-1 FAQ');
  t.is(humanizesSlug('This_is_a_test'), 'This is a test');
  t.is(humanizesSlug('1_FAQ'), 'FAQ');
  t.is(humanizesSlug('_FAQ'), 'FAQ');
  t.is(humanizesSlug('FAQ'), 'FAQ');
  // t.is(humanizesSlug('0_ThisIsATest'), 'This Is A Test');
});

test('test strToSlug function', (t) => {
  // it should transform a string to slug slug
  // t.is(strToSlug('This is a test'), 'Thissatest');
  t.is(strToSlug('A Test'), 'ATest');
  t.is(strToSlug('A  Test'), 'ATest');
  // t.is(strToSlug('A_super Test'), 'AsuperTest');
});

test('test getBasename function', (t) => {
  // it should get the getBasename
  t.is(getBasename('document.txt'), 'document');
  t.is(getBasename('document.test.md'), 'document.test');
});

test('test getExtension function', (t) => {
  // it should get the extension
  t.is(getExtension('document.txt'), 'txt');
  t.is(getExtension('document.test.txt'), 'txt');
  t.is(getExtension('.txt'), '');
  t.is(getExtension('qwe'), '');
  t.is(getExtension(''), '');
});
