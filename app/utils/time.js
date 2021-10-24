import strings from "./helpers";

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
}

export function formatTime(time) {
  return `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(
    time.getSeconds(),
    2
  )}.${pad(time.getMilliseconds(), 3)}`;
}

export function formatMonth(mt) {
  let mlist = [
    strings("JAN"),
    strings("FEB"),
    strings("MAR"),
    strings("APR"),
    strings("MAY"),
    strings("JUN"),
    strings("JUL"),
    strings("AUG"),
    strings("SEP"),
    strings("OCT"),
    strings("NOV"),
    strings("DEC")
  ];
  return mlist[mt];
}

export function formatDate(dt) {
  if (!dt) {
    return;
  }
  return formatMonth(dt.getMonth()) + " " + dt.getFullYear();
}
