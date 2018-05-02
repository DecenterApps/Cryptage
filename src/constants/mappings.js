/**
 * Return plural of a type if it has one
 *
 * @param {String} type
 * @return {String}
 */
export const typeToPluralMapping = (type) => {
  switch (type) {
    case 'Location':
      return 'Locations';
    case 'Container':
      return 'Containers';
    case 'Person':
      return 'People';
    case 'Project':
      return 'Projects';
    default:
      return type;
  }
};
