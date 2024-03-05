export default class ArrayLib {
  static remove = (array, item) => {
    // recherche l'index dans le tableau (comparaison par références d'objets)
    const index = array.indexOf(item);
    // on prend une copie des éléments avec index strictement inférieur
    // on prend une copie des elements avec index strictement supérieur
    // on créer un tableau qui concatène la destructuration de ces tableaux
    return [...array.slice(0, index), ...array.slice(index + 1)];
  };
}
