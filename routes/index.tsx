interface IRoutes {
  href: string;
  title: string;
  testid: string;
}


export const routes: IRoutes[] = [
  { href: "/", title: "Главная", testid: "home" },
  { href: "/custom", title: "Кастом", testid: "custom" },
  { href: "/clothes", title: "Одежда", testid: "clothes" },
  { href: "/arts", title: "Рисунки", testid: "arts" },
  { href: "/auto", title: "Автотовары", testid: "auto" },
];

