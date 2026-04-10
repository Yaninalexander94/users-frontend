/**
 * Копирует собственные свойства объекта src в собственные свойства объекта dest по совпадению имени и,
 * опционально, типа свойства, и только в случае если оба src и dest - объекты и не null.
 *
 * byType - копируются свойства с одинаковым typeof
 * ignoreNull - имеет смысл с byType = true. Свойство в src и в dest не должно равняться null.
 * В этом случае инстанс класса в свойстве объекта src не будет затерт свойством из dest со значением null.
 */
export function assignStrict(
  dest: unknown,
  src: unknown,
  opts: {
    byType: boolean;
    ignoreNull?: boolean;
  } = {
    byType: false,
  },
): void {
  if (!(typeof dest === typeof src && typeof dest === 'object' && !!dest && !!src)) {
    return;
  }

  for (const prop in src) {
    if (
      Object.hasOwn(src, prop) && Object.hasOwn(dest, prop)
      && ( // @ts-ignore
        !opts.byType || typeof src[prop] === typeof dest[prop]
        && ( // @ts-ignore
          !opts.ignoreNull || src[prop] !== null && dest[prop] !== null
        )
      )
    ) { // @ts-ignore
      dest[prop] = src[prop];
    }
  }
}
