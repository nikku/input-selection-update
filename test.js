'use strict';

var calculateUpdate = require('./index'),
    range = require('./index').range;

var expect = require('chai').expect;


describe('selection-update', function() {

  describe('should handle select ALL', function() {

    it('with content removed from middle', expectUpdate('|AABBC|', 'AA|C'));

    it('with content added in middle', expectUpdate('|AABBC|', 'AAVV|BBC'));

  });


  describe('should handle same string update', function() {

    it('keep mid selection', expectUpdate('AABB|CCC', 'AABB|CCC'));

    it('keep start selection', expectUpdate('|AABBCCC', '|AABBCCC'));

    it('keep end selection', expectUpdate('AABBCCC|', 'AABBCCC|'));

  });


  describe('should handle empty string', function() {

    it('with content added', expectUpdate('|', 'AAA|'));

  });


  describe('should modify cursor adding content', function() {

    it('after cursor', expectUpdate('AA|BBC', 'AABBCVV|'));

    it('directly after cursor', expectUpdate('AA|BBC', 'AAVV|BBC'));

    it('before cursor', expectUpdate('AA|BBC', 'VV|AABBC'));

    it('directly before cursor', expectUpdate('AA|BBC', 'AAVV|BBC'));

  });


  describe('should handle replace', function() {

    it('with longer text', expectUpdate('AA|BB', 'XXFFOOLL|'));

    it('with shorter text', expectUpdate('XXFFOO|LL', 'XX|AABB'));

  });


  describe('should modify cursor removing content', function() {

    it('after cursor', expectUpdate('AA|BBVVC', 'AABB|C'));

    it('directly after cursor', expectUpdate('AABB|VVC', 'AA|VVC'));

    it('before cursor', expectUpdate('AAVVBB|C', 'AA|BBC'));

    it('directly before cursor', expectUpdate('AABB|VVC', 'AA|VVC'));

  });

});


function expectUpdate(oldString, newString) {

  return function() {

    var oldStart, oldEnd;

    oldStart = oldString.indexOf('|');

    if (oldStart === -1) {
      throw new Error('no start cursor (|) in old string');
    }

    oldEnd = oldString.indexOf('|', oldStart + 1);

    if (oldEnd === -1) {
      oldEnd = oldStart;
    } else {
      oldEnd = oldEnd - 1;
    }

    oldString = oldString.replace(/\|/g, '');

    var newStart, newEnd;

    newStart = newString.indexOf('|');

    if (newStart === -1) {
      throw new Error('no start cursor (|) in new string');
    }

    newEnd = newString.indexOf('|', newStart + 1);

    if (newEnd === -1) {
      newEnd = newStart;
    } else {
      newEnd = newEnd - 1;
    }

    newString = newString.replace(/\|/g, '');

    // when
    var oldSelection = range(oldStart, oldEnd);
    var newSelection = calculateUpdate(oldSelection, oldString, newString);

    // then
    expect(newSelection).to.eql(range(newStart, newEnd));

  }
}