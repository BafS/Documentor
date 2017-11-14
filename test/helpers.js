const assert = require('assert');

const {
  removeLeadingNumber,
  humanizesSlug,
  strToSlug,
  getBasename,
  getExtension,
} = require('../src/helpers');

describe('Test helpers', () => {
  describe('test removeLeadingNumber function', () => {
    it('should remove the leading number', () => {
      assert.strictEqual(removeLeadingNumber('0_ThisIsATest'), 'ThisIsATest');
      assert.strictEqual(removeLeadingNumber('000_ThisIsATest'), 'ThisIsATest');
      assert.strictEqual(removeLeadingNumber('12345_FAQ'), 'FAQ');
      assert.strictEqual(removeLeadingNumber('09870_FAQ'), 'FAQ');
      assert.strictEqual(removeLeadingNumber('-1_FAQ'), '-1_FAQ');
      assert.strictEqual(removeLeadingNumber('_FAQ'), '_FAQ');
      assert.strictEqual(removeLeadingNumber('ThisIsATest'), 'ThisIsATest');
    });
  });

  describe('test humanizesSlug function', () => {
    it('should humanize slug', () => {
      // assert.strictEqual(humanizesSlug('0_ThisIsATest'), 'This Is A Test');
      assert.strictEqual(humanizesSlug('12345_FAQ'), 'FAQ');
      assert.strictEqual(humanizesSlug('-1_FAQ'), '-1 FAQ');
      assert.strictEqual(humanizesSlug('This_is_a_test'), 'This is a test');
      assert.strictEqual(humanizesSlug('1_FAQ'), 'FAQ');
      assert.strictEqual(humanizesSlug('_FAQ'), 'FAQ');
      assert.strictEqual(humanizesSlug('FAQ'), 'FAQ');
      // assert.strictEqual(humanizesSlug('0_ThisIsATest'), 'This Is A Test');
    });
  });

  describe('test strToSlug function', () => {
    it('should transform a string to slug slug', () => {
      // assert.strictEqual(strToSlug('This is a test'), 'Thissatest');
      assert.strictEqual(strToSlug('A Test'), 'ATest');
      assert.strictEqual(strToSlug('A  Test'), 'ATest');
      // assert.strictEqual(strToSlug('A_super Test'), 'AsuperTest');
    });
  });

  describe('test getBasename function', () => {
    it('should get the getBasename', () => {
      assert.strictEqual(getBasename('document.txt'), 'document');
      assert.strictEqual(getBasename('document.test.md'), 'document.test');
    });
  });

  describe('test getExtension function', () => {
    it('should get the extension', () => {
      assert.strictEqual(getExtension('document.txt'), 'txt');
      assert.strictEqual(getExtension('document.test.txt'), 'txt');
      assert.strictEqual(getExtension('.txt'), '');
      assert.strictEqual(getExtension('qwe'), '');
      assert.strictEqual(getExtension(''), '');
    });
  });
});
