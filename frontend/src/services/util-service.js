export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  randomColor,
};

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function makeId(length = 4) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function randomColor() {
  var colors = [
    'rgb(3, 127, 76)',
    'rgb(0, 200, 117)',
    'rgb(156, 211, 38)',
    'rgb(202, 182, 65)',
    ' rgb(255, 203, 0)',
    'rgb(120, 75, 209)',
    ' rgb(162, 93, 220)',
    'rgb(0, 134, 192)',
    'rgb(102, 204, 255)',
    'rgb(187, 51, 84)',
    'rgb(226, 68, 92)',
    ' rgb(255, 21, 138)',
    'rgb(255, 90, 196)',
    'rgb(255, 100, 46)',
    'rgb(253, 171, 61)',
    'rgb(127, 83, 71)',
    'rgb(196, 196, 196)',
    'rgb(128, 128, 128)',
    ' rgb(87, 155, 252)',
  ];
  var randNum = Math.floor(Math.random() * (colors.length - 1 - 0 + 1)) + 0;
  return colors[randNum];
}
