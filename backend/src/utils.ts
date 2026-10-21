export function random(len: number) {
  let options = '1234567890qwertyuiopasdfghjklzxcvbnm';
  let length = options.length;
  let ans = '';
  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * length)];
  }
  return ans;
}
