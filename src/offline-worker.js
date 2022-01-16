/* eslint-env serviceworker */

const cacheName = `Lotus`;

// NOTE: Filenames in the asset list need to start with an initial slash
// in order to be matched correctly curing cleanupCache().
let assets = [];

async function cacheAssets() {
  const response = await fetch(`cache.json`);
  assets         = await response.json();
  const cache    = await caches.open(cacheName);
  await cache.addAll(assets);
}

async function cleanupCache() {

  const cache = await caches.open(cacheName);
  const keys  = await cache.keys();

  for (const key of keys) {
    const { pathname } = new URL(key.url);
    if (!assets.includes(pathname)) await cache.delete(key);
  }

  self.skipWaiting();

}

async function resolveResponse(ev) {

  const { request } = ev;
  if (request.method !== `GET`) return fetch(request);

  const cache           = await caches.open(cacheName);
  const cacheResponse   = await cache.match(request);

  const networkResponse = fetch(request).then(response => {

    if (!response || response.status !== 200 || response.type !== `basic`) {
      return response;
    }

    // cache the network response
    const clonedResponse = response.clone();
    cache.put(request, clonedResponse);

    return response;

  });

  return cacheResponse ?? networkResponse;

}

self.addEventListener(`activate`, ev => ev.waitUntil(cleanupCache()));
self.addEventListener(`fetch`, ev => ev.respondWith(resolveResponse(ev)));
self.addEventListener(`install`, ev => ev.waitUntil(cacheAssets()));
