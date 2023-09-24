// noinspection JSIgnoredPromiseFromCall

(() => {
    /** 缓存库名称 */
    const CACHE_NAME = 'MarcusBlogCache'
    /** 控制信息存储地址（必须以`/`结尾） */
    const CTRL_PATH = 'https://id.v3/'

    const ejectDomain = 'blog.marcus233.top'


    /** 控制信息读写操作 */
    const dbVersion = {
        write: (id) => caches.open(CACHE_NAME)
            .then(cache => cache.put(CTRL_PATH, new Response(JSON.stringify(id)))),
        read: () => caches.match(CTRL_PATH).then(response => response?.json())
    }

    self.addEventListener('install', () => {
        self.skipWaiting()
        const escape = 0
        if (escape) {
            dbVersion.read().then(oldVersion => {
                if (oldVersion && oldVersion.escape !== escape) {
                    oldVersion.escape = escape
                    dbVersion.write(oldVersion)
                    // noinspection JSUnresolvedVariable
                    caches.delete(CACHE_NAME)
                        .then(() => clients.matchAll())
                        .then(list => list.forEach(client => client.postMessage({type: 'escape'})))
                }
            })
        }
    })

    // sw 激活后立即对所有页面生效，而非等待刷新
    // noinspection JSUnresolvedReference
    self.addEventListener('activate', event => event.waitUntil(clients.claim()))

    // noinspection JSFileReferences
    let cacheRules = {
simple: {
clean: true,
search: false,
match: url => {
      const allowedHost = ejectDomain;
      return url.host === allowedHost && url.pathname.match(/\.(woff2|woff|ttf|cur)$/)
    }}
,
cdn: {
clean: true,
match: url =>
      [
        "cdn.cbd.int",
        "lf26-cdn-tos.bytecdntp.com",
        "lf6-cdn-tos.bytecdntp.com",
        "lf3-cdn-tos.bytecdntp.com",
        "lf9-cdn-tos.bytecdntp.com",
        "cdn.staticfile.org",
        "npm.elemecdn.com",
        "jsd.onmicrosoft.cn",
        "cdn.chuqis.com",
      ].includes(url.host) && url.pathname.match(/\.(js|css|woff2|woff|ttf|cur)$/)}
}

let getSpareUrls = srcUrl => {
    if (srcUrl.startsWith('https://cdn.chuqis.com')) {
        return {
            timeout: 3000,
            list: [
                srcUrl,
                `https://jsd.onmicrosoft.cn/${new URL(srcUrl).pathname}`
            ]
        }
    }
}

    const fetchFile = (request, banCache, spare = null) => {
        const fetchArgs = {
            cache: banCache ? 'no-store' : 'default',
            mode: 'cors',
            credentials: 'same-origin'
        }
        if (!spare) {
            spare = getSpareUrls(request.url)
            if (!spare) return fetch(request, fetchArgs)
        }
        const list = spare.list
        const controllers = new Array(list.length)
        const startFetch =
            index => fetch(
                new Request(list[index], request),
                Object.assign({
                    signal: (controllers[index] = new AbortController()).signal
                }, fetchArgs)
            ).then(response => checkResponse(response) ? {r: response, i: index} : Promise.reject())
        return new Promise((resolve, reject) => {
            let flag = true
            const startAll = () => {
                flag = false
                Promise.any([
                    first,
                    ...Array.from({
                        length: list.length - 1
                    }, (_, index) => index + 1).map(index => startFetch(index))
                ]).then(res => {
                    for (let i = 0; i !== list.length; ++i) {
                        if (i !== res.i)
                            controllers[i].abort()
                    }
                    resolve(res.r)
                }).catch(() => reject(`请求 ${request.url} 失败`))
            }
            const id = setTimeout(startAll, spare.timeout)
            const first = startFetch(0)
                .then(res => {
                    if (flag) {
                        clearTimeout(id)
                        resolve(res.r)
                    }
                }).catch(() => {
                    if (flag) {
                        clearTimeout(id)
                        startAll()
                    }
                    return Promise.reject()
                })
        })
    }


    // 检查请求是否成功
    // noinspection JSUnusedLocalSymbols
    const checkResponse = response => response.ok || [301, 302, 307, 308].includes(response.status)

    /**
     * 删除指定缓存
     * @param list 要删除的缓存列表
     * @return {Promise<string[]>} 删除的缓存的URL列表
     */
    const deleteCache = list => caches.open(CACHE_NAME).then(cache => cache.keys()
        .then(keys => Promise.all(
            keys.map(async it => {
                const url = it.url
                if (url !== CTRL_PATH && list.match(url)) {
                    // [debug delete]
                    // noinspection ES6MissingAwait,JSCheckFunctionSignatures
                    cache.delete(it)
                    return url
                }
                return null
            })
        )).then(list => list.filter(it => it))
    )

    self.addEventListener('fetch', event => {
        let request = event.request
        if (request.method !== 'GET' || !request.url.startsWith('http')) return
        // [modifyRequest call]
        const url = new URL(request.url)
        // [blockRequest call]
        const cacheRule = findCache(url)
        if (cacheRule) {
            let key = `https://${url.host}${url.pathname}`
            if (key.endsWith('/index.html')) key = key.substring(0, key.length - 10)
            if (cacheRule.search) key += url.search
            event.respondWith(caches.match(key)
                .then(cache => cache ?? fetchFile(request, true)
                    .then(response => {
                        if (checkResponse(response)) {
                            const clone = response.clone()
                            caches.open(CACHE_NAME).then(it => it.put(key, clone))
                            // [debug put]
                        }
                        return response
                    })
                )
            )
        } else {
            const spare = getSpareUrls(request.url)
            if (spare) event.respondWith(fetchFile(request, false, spare))
            // [modifyRequest else-if]
        }
    })

    self.addEventListener('message', event => {
        // [debug message]
        if (event.data === 'update')
            updateJson().then(info =>
                // noinspection JSUnresolvedVariable
                event.source.postMessage({
                    type: 'update',
                    update: info.list,
                    version: info.version,
                })
            )
    })

    /** 判断指定url击中了哪一种缓存，都没有击中则返回null */
    function findCache(url) {
        if (url.hostname === 'localhost') return
        for (let key in cacheRules) {
            const value = cacheRules[key]
            if (value.match(url)) return value
        }
    }

    /**
     * 根据JSON删除缓存
     * @returns {Promise<{version, list}>}
     */
    const updateJson = () => {
        /**
         * 解析elements，并把结果输出到list中
         * @return boolean 是否刷新全站缓存
         */
        const parseChange = (list, elements, ver) => {
            for (let element of elements) {
                const {version, change} = element
                if (version === ver) return false
                if (change) {
                    for (let it of change)
                        list.push(new CacheChangeExpression(it))
                }
            }
            // 跨版本幅度过大，直接清理全站
            return true
        }
        /** 解析字符串 */
        const parseJson = json => dbVersion.read().then(oldVersion => {
            const {info, global} = json
            const newVersion = {global, local: info[0].version, escape: oldVersion?.escape ?? 0}
            //新用户不进行更新操作
            if (!oldVersion) {
                dbVersion.write(newVersion)
                return newVersion
            }
            let list = new VersionList()
            let refresh = parseChange(list, info, oldVersion.local)
            dbVersion.write(newVersion)
            // [debug escape]
            //如果需要清理全站
            if (refresh) {
                if (global !== oldVersion.global) list.force = true
                else list.refresh = true
            }
            return {list, version: newVersion}
        })
        return fetchFile(new Request('/update.json'), false)
            .then(response => {
                if (checkResponse(response))
                    return response.json().then(json =>
                        parseJson(json).then(result => {
                                return result.list ? deleteCache(result.list)
                                    .then(list => list.length === 0 ? null : list)
                                    .then(list => ({list, version: result.version}))
                                    : {version: result}
                            }
                        )
                    )
                else throw `加载 update.json 时遇到异常，状态码：${response.status}`
            })
    }

    /**
     * 版本列表
     * @constructor
     */
    function VersionList() {

        const list = []

        /**
         * 推送一个表达式
         * @param element {CacheChangeExpression} 要推送的表达式
         */
        this.push = element => {
            list.push(element)
        }

        /**
         * 判断指定 URL 是否和某一条规则匹配
         * @param url {string} URL
         * @return {boolean}
         */
        this.match = url => {
            if (this.force) return true
            // noinspection JSValidateTypes
            url = new URL(url)
            if (this.refresh) return findCache(url).clean
            else {
                for (let it of list) {
                    if (it.match(url)) return true
                }
            }
            return false
        }

    }

    // noinspection SpellCheckingInspection
    /**
     * 缓存更新匹配规则表达式
     * @param json 格式{"flag": ..., "value": ...}
     * @see https://kmar.top/posts/bcfe8408/#23bb4130
     * @constructor
     */
    function CacheChangeExpression(json) {
        /**
         * 遍历所有value
         * @param action {function(string): boolean} 接受value并返回bool的函数
         * @return {boolean} 如果value只有一个则返回`action(value)`，否则返回所有运算的或运算（带短路）
         */
        const forEachValues = action => {
            const value = json.value
            if (Array.isArray(value)) {
                for (let it of value) {
                    if (action(it)) return true
                }
                return false
            } else return action(value)
        }
        const getMatch = () => {
            switch (json['flag']) {
                case 'html':
                    return url => url.pathname.match(/(\/|\.html)$/)
                case 'end':
                    return url => forEachValues(value => url.href.endsWith(value))
                case 'begin':
                    return url => forEachValues(value => url.pathname.startsWith(value))
                case 'str':
                    return url => forEachValues(value => url.href.includes(value))
                case 'reg':
                    // noinspection JSCheckFunctionSignatures
                    return url => forEachValues(value => url.href.match(new RegExp(value, 'i')))
                default: throw `未知表达式：${JSON.stringify(json)}`
            }
        }
        this.match = getMatch()
    }
})()