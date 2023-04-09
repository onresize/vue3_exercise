export const loadData = {}
const asstesData = {
    bg: 'assets/bg.jpg',
    fall: 'assets/fall.png',
    fly: 'assets/fly.png',
    boom1: 'assets/boom1.png',
    boom2: 'assets/boom2.png',
    boom3: 'assets/boom3.png',
    boom4: 'assets/boom4.png',
    boom5: 'assets/boom5.png',
    boom6: 'assets/boom6.png',
    boom7: 'assets/boom7.png',
    pay: 'assets/pay.svg'
}

export function preload() {
    let index = 0;
    let list = Object.entries(asstesData)
    return new Promise((resolve, reject) => {
        for (const [key, value] of list) {
            var img = new Image();
            img.onload = function () {
                if (++index >= list.length) {
                    resolve(loadData)
                }
            }
            img.src = value;
            loadData[key] = img;
        }
    })
}