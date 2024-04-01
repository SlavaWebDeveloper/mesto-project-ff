const shark = new URL ('https://cdn.pixabay.com/photo/2024/01/27/10/23/shark-8535643_1280.jpg', import.meta.url);
const apple = new URL ('https://cdn.pixabay.com/photo/2024/01/12/04/10/photoshop-8503075_1280.jpg', import.meta.url);
const dobby = new URL ('https://cdn.pixabay.com/photo/2023/12/20/10/27/christmas-8459516_1280.jpg', import.meta.url);
const flowers = new URL ('https://cdn.pixabay.com/photo/2023/10/02/11/56/flowers-8289075_1280.jpg', import.meta.url);
const octopus = new URL ('https://cdn.pixabay.com/photo/2024/01/27/10/23/octopus-8535647_1280.jpg', import.meta.url);
const home = new URL ('https://cdn.pixabay.com/photo/2023/10/02/11/51/gingerbread-8289064_1280.jpg', import.meta.url);

const initialCards = [
    {
      name: "Плюшевая акула",
      link: shark,
    },
    {
      name: "Бушующий океан в яблоке",
      link: apple,
    },
    {
      name: "Елочная игрушка 'Добби'",
      link: dobby,
    },
    {
      name: "Ваза с цветами",
      link: flowers,
    },
    {
      name: "Плюшевый осминог",
      link: octopus,
    },
    {
      name: "Пряничный дом",
      link: home,
    }
];

export default initialCards;