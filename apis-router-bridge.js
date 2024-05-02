import router from './router'

const createReq = (c) => {
  const url = new URL(c.req.url)
  return {
    method: c.req.method,
    url: url.pathname,
    headers: Object.fromEntries(c.req.raw.headers.entries()),
    query: c.req.query(),
    params: c.req.param(),
  }
}

const createRes = (c, resolve) => {
  return {
    status(code) {
      c.status(code)
      return this
    },
    json(data) { return resolve(c.json(data)) },
    cache(seconds = 21600) {
      // Let the reverse proxy cache the response (`s-maxage`)
      c.header(
        'Cache-Control',
        `max-age=${seconds}, s-maxage=${seconds}, stale-while-revalidate=${seconds}`,
      )

      return this
    },
  }
}

export function get(path, handler) {
  router.get(path, async (c, next) => new Promise((resolve, reject) => {
    const req = createReq(c)
    const res = createRes(c, resolve)

    // TODO: how to handle `next`? -> clean up the code
    return handler(req, res, next)
  }))
}

export function post() {}