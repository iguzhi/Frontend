export default function say() {
  console.log('hello vue')
}

export function getData() {
  return new Promise(function(resolve) {
    resolve('OK!');
  })
}