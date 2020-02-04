/**
 * Real interesting problem I was given. Done after a bit of research
 *
 * @param {string} string
 * @param {string} sub
 */
function getIndex(string, sub) {
  // strings are empty
  if (string.length === 0 && sub.length === 0) return 0;
  // we have finished string and we still have sub
  // - means string does not contain it
  if (string.length === 0) return -1;
  // finished sub and we still have string -
  // means string begins with sub
  if (sub.length === 0) return 0;
  // we have longer sub than string - means
  // string cannot contain it
  if (sub.length > string.length) return -1;
  // If we have a match
  if (string[0] === sub[0]) {
    // move up one char for both
    return getIndex(string.substring(1), sub.substring(1));
  } else {
    // if not, move up one char in string and scan again
    let index = getIndex(string.substring(1), sub);
    return index === -1 ? -1 : index + 1;
  }
}

// get the first occurence of ipsum in this string
const i = getIndex("Lorem ipsum dolor sit amec consectetur", "ipsum");
console.log(i);

// Override String.indexOf
String.prototype.indexOf = function(sub) {
  console.log("Override called");
  return getIndex(this, sub);
};

// We can now call the overridden method on ALL string objects
// in this scope
const j = "I am a T*E*S*T string".indexOf("T*E*S*T");
console.log(j);
