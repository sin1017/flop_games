// tool
//# element 生成
function createElementTool({ element = 'img', className = 'card', appendPosition = appendTarget } = {}) {
  let el = document.createElement(element);
  el.src = './image/back.webp';
  appendPosition.appendChild(el)
  el.className = className;
  return el
}
//# 取得隨機key
function getRandomKey(max, main = 0) {
  return Math.floor(Math.random() * (max - main)) + main;
};
//# 更換img url
function changeImgUrl(element, imgUrl,) {
  element.src = imgUrl;
  // console.log(element);
  // console.log(imgUrl);
}
//# className 新增、刪除
function classNameProcessing({ element, addName = null, removeName = null } = {}) {
  if (typeof addName === 'string') element.classList.add(addName);
  if (typeof removeName === 'string') element.classList.remove(removeName);
}
// data
const cardImageListDefault = [
  {
    name: 'pic1',
    url: './image/pic1.webp'
  },
  {
    name: 'pic2',
    url: './image/pic2.webp',
  },
  {
    name: 'pic3',
    url: './image/pic3.webp',
  },
  {
    name: 'pic4',
    url: './image/pic4.webp',
  },
  {
    name: 'pic5',
    url: './image/pic5.webp',
  },
  {
    name: 'pic6',
    url: './image/pic6.webp',
  }
]

const cardDefaultImageSrc = './image/back.webp';
const appendTarget = document.querySelector('.cardTable');
const cardList = Array(12).fill(0).map((v, i) => createElementTool());
let clickTarget = ''
let flipCardSwitch = 0;

for (let i = 0; i < cardList.length; i++) {
  const randomKey = getRandomKey(cardImageListDefault.length);
  const imgUrl = cardImageListDefault[randomKey];
  const target = cardList.filter(v => v.name === imgUrl.name);
  if (target.length === 2) {
    i--;
  } else {
    cardList[i] = {
      el: cardList[i],
      ...imgUrl
    }
  }
}


cardList.forEach((v, i) => {
  v.el.addEventListener('click', () => {
    if (flipCardSwitch === 2) return;
    flipCardSwitch++;
    v.el.classList.add('flipCardStart');
    v.el.addEventListener('animationstart', () => {
      setTimeout(() => {
        changeImgUrl(v.el, v.url);
      }, 500)
    }, { once: true });

    v.el.addEventListener('animationend', () => {
      if (clickTarget !== '') {
        if (clickTarget.name !== v.name) {
          classNameProcessing({ element: v.el, addName: 'flipCardEnd', removeName: 'flipCardStart' });
          classNameProcessing({ element: clickTarget.el, addName: 'flipCardEnd', removeName: 'flipCardStart' });
          v.el.addEventListener('animationstart', () => {
            setTimeout(() => {
              changeImgUrl(v.el, cardDefaultImageSrc);
              changeImgUrl(clickTarget.el, cardDefaultImageSrc);
            }, 500)
          }, { once: true });

          v.el.addEventListener('animationend', () => {
            classNameProcessing({ element: v.el, removeName: 'flipCardEnd' });
            classNameProcessing({ element: clickTarget.el, removeName: 'flipCardEnd' })
            clickTarget = ''
          }, { once: true });
        } else {
          clickTarget = ''
        }
        return flipCardSwitch = 0;
      }
      clickTarget = v;
    }, { once: true });
  });
});
