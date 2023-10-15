// 存数据
function saveData(name, data) { localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data })) };
// 取数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (-1 < t && t < (time * 60000)) return d.data;
    }
    return 0;
};

let talkTimer = null;
function indexTalk() {
    if (talkTimer) {
        clearInterval(talkTimer)
        talkTimer = null;
    }
    if (!document.getElementById('bber-talk')) return

    function toText(ls) {
        let text = []
        ls.forEach(item => {
            text.push(item.content.replace(/#(.*?)\s/g, '').replace(/\{(.*?)\}/g, '').replace(/\!\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-image"></i>').replace(/\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-link"></i>'))
        });
        return text
    }

    function talk(ls) {
        let html = ''
        let essay = document.querySelector("#bber-talk").innerHTML
        ls.forEach((item, i) => { html += `<div class="li-style swiper-slide">${item}</div>` });
        let box = document.querySelector("#bber-talk")
        box.innerHTML = html + essay;
        talkTimer = setInterval(() => {
            box.appendChild(box.children[0]);
        }, 3000);
    }

    let d = loadData('talk', 10);
    if (d) talk(d);
    else {
    // memos1.4.0以上版本请在下面的/api/后面加上v1，即/api/v1/memo?creatorId=1&tag=说说&limit=30
        fetch('https://memos.marcus233.top/api/v1/memo?creatorId=1&tag=说说&limit=10').then(res => res.json()).then(data => { // 更改地址和ID
            // memos1.4.0以上版本请删除掉下面的一个data，即data = toText(data)
            data = toText(data)
            talk(data);
            saveData('talk', data);
        })
    }
}

// pjax注释掉上面的 indexTalk(); 使用如下方法：
function whenDOMReady() {
    indexTalk();
}

whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)