function decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
  while (hex.length < padding) {
    hex = "0" + hex;
  }
  return hex;
}
export function arrayBufferToBase64(buffer) {
  var binary = '';
  for (var i of buffer) {
    binary += decimalToHex(i)
  }
  let base64String = Buffer.from(binary, 'hex').toString('base64')
  return base64String
}

// http://jsfiddle.net/4gwmqbn7/15/
// https://codepen.io/abdhass/pen/jdRNdj
// https://medium.com/@divinehycenth8/convert-a-base64-data-into-an-image-in-node-js-d82136576e35
