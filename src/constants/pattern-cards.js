const rostov = new URL("../images/card/rostov.jpg", import.meta.url);
const azov = new URL("../images/card/azov.jpg", import.meta.url);
const Gukovo = new URL("../images/card/Gukovo.jpg", import.meta.url);
const Novocherkassk = new URL(
  "../images/card/Novocherkassk.jpg",
  import.meta.url
);
const shahty = new URL("../images/card/shahty.jpg", import.meta.url);
const taganrog = new URL("../images/card/taganrog.jpg", import.meta.url);

export const initialCards = [
  {
    name: "Ростов-на-Дону",
    link: rostov,
  },
  {
    name: "Азов",
    link: azov,
  },
  {
    name: "Гуково",
    link: Gukovo,
  },
  {
    name: "Новочеркаск",
    link: Novocherkassk,
  },
  {
    name: "Шахты",
    link: shahty,
  },
  {
    name: "Таганрог",
    link: taganrog,
  },
];
