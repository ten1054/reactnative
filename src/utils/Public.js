// 转化时间单位
function changeTimeUnit(time) {
  if (!time) {
    return '00:00';
  }
  let hour = Math.floor(time / 3600);
  hour = hour < 10 ? `0${hour}` : hour;
  let min = Math.floor((time / 60) % 60);
  min = min < 10 ? `0${min}` : min;
  let second = Math.floor(time % 60);
  second = second < 10 ? `0${second}` : second;
  if (hour !== '00') {
    return `${hour}:${min}:${second}`;
  }
  return `${min}:${second}`;
}

export {changeTimeUnit};
