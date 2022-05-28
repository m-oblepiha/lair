import { roll } from 'common/utils/rolls/roll';

const petNames: string[] = [
  'Вырбырдль',
  'Нурвыргл',
  'Бырбордль',
  'Каргурбл',
  'Мирвурдл',
  'Лордырдль',
  'Шефбургер',
  'Наргаргл',
  'Горборгл',
  'Мурмыркл',
  'Ардардл',
  'Эрвэргл',
  'Урлурдль',
  'Ойвойрбр',
  'Дурбурд',
  'Бардард',
  'Рыдгырб',
  'Гурвырд',
  'Выдрурб',
  'Ургур',
  'Шрэрш',
  'Кйодд',
  'Нгоргх',
  'Фырфл',
  'Ычь',
  'Дырдл',
  'Арбр',
  'Ихч',
  'Горг',
  'Вуглускр',
  'Олег',
  'Щищ',
];

const generatePetName = () =>
  petNames.splice(roll(0, petNames.length - 1), 1)[0] ?? 'Андифайнд';

export { generatePetName };
