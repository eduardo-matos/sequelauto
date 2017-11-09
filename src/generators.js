import moment from 'moment';
import pad from 'pad';

export function str(length = 10, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let val = '';
  for (let i = 0, charsLength = chars.length; i < length; i += 1) {
    val += chars[Math.floor(Math.random() * charsLength)];
  }

  return val;
}

export function int(max = 1) {
  return () => Math.floor(Math.random() * (max + 1));
}

export function float(max = 1) {
  return Math.random() * (max + 1);
}

export function boolean() {
  return !!int(1)();
}

export function enumm(values) {
  return values[int(values.length - 1)()];
}

export function datetime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

export function time() {
  const hours = int(838)();
  const minutes = pad(2, int(59)(), '0');
  const seconds = pad(2, int(59)(), '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function uuid() {
  const chars = '0123456789abcdef';
  return `${str(8, chars)}-${str(4, chars)}-${str(4, chars)}-${str(4, chars)}-${str(12, chars)}`;
}

export function json() {
  return { [str()]: str() };
}

export function blob() {
  return Buffer.alloc(10, str(10));
}
