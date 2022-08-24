/***
 * Shows a different error message if in dev mode
 */

export function dconsole(message) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local') {
    if (typeof message === 'object') {
      const object = JSON.parse(message);
      console.dir(object, { depth: null, colors: true });
    } else {
      console.log(message);
    }
  }
}
