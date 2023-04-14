export const loadData = {};

const asstesData = {};

export function preload() {
  let index = 0;
  let list = Object.entries(asstesData);
  return new Promise((resolve, reject) => {
    if (list.length === 0) return resolve({});
    for (const [key, value] of list) {
      var img = new Image();
      img.onload = function () {
        if (++index >= list.length) {
          resolve(loadData);
        }
      };
      img.src = value;
      loadData[key] = img;
    }
  });
}
