import axios from 'axios';
axios.defaults.timeout = 5000;

function getJapanDmList(page, callback) {
  let url = 'http://www.iyinghua.io/japan/';
  if (page !== 1) {
    url = url + page + '.html';
  }
  getDMList(url, page, callback);
}

function getChinaDmList(page, callback) {
  let url = 'http://www.iyinghua.io/china/';
  if (page !== 1) {
    url = url + page + '.html';
  }
  getDMList(url, page, callback);
}

function getForeignDmList(page, callback) {
  let url = 'http://www.iyinghua.io/american/';
  if (page !== 1) {
    url = url + page + '.html';
  }
  getDMList(url, page, callback);
}

async function getDMList(url, page, callback) {
  const request = new XMLHttpRequest();
  request.open('get', url);
  request.send();
  request.onreadystatechange = (http, event) => {
    if (request.readyState === 4 && request.status == '200') {
      callback(true, handleText(request.responseText));
    } else if (request.readyState === 4 && request.status !== '200') {
      callback(false, JSON.stringify(request));
    }
  };
}

async function getSearchList(params, page, callback) {
  let url = 'http://www.iyinghua.io/search/' + params + `?page=${page}`;
  const request = new XMLHttpRequest();
  request.open('get', url);
  request.send();
  request.onreadystatechange = (http, event) => {
    if (request.readyState === 4 && request.status == '200') {
      callback(true, handleText(request.responseText));
    } else if (request.readyState === 4 && request.status !== '200') {
      callback(false, JSON.stringify(request));
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
    const latestReg = /<span><font [^>]*>(.*?)<\/font><\/span>/;
    const videoPathReg = /href="[^"]*\/(\d+)/;
    const desReg = /<p>([\s\S]*?)<\/p>/;
    liRes.forEach(x => {
      const src = x.match(imgReg)[1];
      const title = x.match(nameReg)[1];
      const latest = x.match(latestReg)[1];
      const videoPage = x.match(videoPathReg)[1];
      const describe = x.match(desReg)[1];
      result.push({
        src,
        title,
        describe: describe.replace(/[\r\n]+/gm, '').replace(/&hellip;/g, ''),
        latest,
        videoPage,
      });
    });
    return result;
  } catch (error) {
    return [];
  }
}

// 用来获取播放页面的数据

function handlePlayerInf(responseText, path) {
  let result = {};
  try {
    const imgReg = /data-vid="([^"]*)"/;
    const movurlsReg = /<div class="movurls">[\s\S]*?<\/div>/;
    const liReg = /<li[^>]*>[\s\S]*?<\/li>/gi;
    const vid = responseText.match(imgReg)[1];
    const movurls = responseText.match(movurlsReg)[0];
    result.url = vid.replace('$mp4', '');
    const list = movurls.match(liReg);
    result.episodesList = new Array(list.length).fill(Math.random());
    result.currentEpisodes = path.split('-')[1].replace('.html', '');
    return result;
  } catch (error) {
    return {url: '', episodesList: [], currentEpisodes: 1, ...result};
  }
}

export {
  getJapanDmList,
  getChinaDmList,
  getForeignDmList,
  getDMList,
  getSearchList,
  enterVideo,
};
