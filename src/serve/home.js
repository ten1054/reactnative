import axios from 'axios';
axios.defaults.timeout = 5000;

async function getDMList(page, callback) {
  let url = 'http://www.iyinghua.io/japan/';
  if (page !== 1) {
    url = url + page + '.html';
  }
  const request = new XMLHttpRequest();
  request.open('get', url);
  request.send();
  request.onreadystatechange = (http, event) => {
    if (request.readyState === 4 && request.status == '200') {
      callback(handleText(request.responseText));
    } else if (request.readyState === 4 && request.status !== '200') {
      callback(false);
    }
  };
}

async function enterVideo(id, page, callback) {
  const path = `/v/${id}-${page}.html`;
  let url = 'http://www.iyinghua.io' + path;
  const request = new XMLHttpRequest();
  request.open('get', url);
  request.send();
  request.onreadystatechange = (http, event) => {
    if (request.readyState === 4 && request.status == '200') {
      callback(handlePlayerInf(request.responseText, path));
    } else if (request.readyState === 4 && request.status !== '200') {
      callback(false);
    }
  };
}

// 用来获取单个分区页面里面的所有动漫列表数据
function handleText(responseText) {
  try {
    let result = [];
    const divReg = /<div class="lpic">[\s\S]*?<\/div>/gi;
    const divRes = responseText.match(divReg)[0];
    const liReg = /<li>[\s\S]*?<\/li>/gi;
    const liRes = divRes.match(liReg);
    const imgReg = /src="([^"]*)"/;
    const nameReg = /title="([^"]*)"/;
    const latestReg = /<font [^>]*>(.*?)<\/font>/;
    const videoPathReg = /href="[^"]*\/(\d+)/;
    liRes.forEach(x => {
      const src = x.match(imgReg)[1];
      const title = x.match(nameReg)[1];
      const latest = x.match(latestReg)[1];
      const videoPage = x.match(videoPathReg)[1];
      result.push({
        src,
        title,
        latest,
        videoPage,
      });
    });
    return result;
  } catch (error) {
    return false;
  }
}

// 用来获取播放页面的数据

function handlePlayerInf(responseText, path) {
  let result = {};
  const imgReg = /data-vid="([^"]*)"/;
  const movurlsReg = /<div class="movurls">[\s\S]*?<\/div>/;
  const liReg = /<li>[\s\S]*?<\/li>/gi;
  const vid = responseText.match(imgReg)[1];
  const movurls = responseText.match(movurlsReg)[0];
  result.url = vid.replace('$mp4', '');
  const list = movurls.match(liReg);
  result.episodesList = new Array(list.length).fill(Math.random());
  result.currentEpisodes = path.split('-')[1].replace('.html', '');
  return result;
}

export {getDMList, enterVideo};
