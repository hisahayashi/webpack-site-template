declare function require(x: string): any

type Prop<T> = () => T

interface CarouselItem {
  image: string,
  number: number,
  name_jp: string,
  name_en: string,
  link: string
}

declare module CarouselItem {
  image: String
  number: Number
  name_jp: String
  name_en: String
  link: String
}
