importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
	{ url: '/icon.png', revision: '1' },
	{ url: '/customicon.png', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/push.js', revision: '1' },
	{ url: '/listteam.html', revision: '1' },
	{ url: '/pages/home.html', revision: '1' },
	{ url: '/pages/jadwal.html', revision: '1' },
	{ url: '/pages/faveteam.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/css/style.css', revision: '1' },
	{ url: '/css/materialize.css', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' }
]);
workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2'),
	workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(new RegExp('.*.js' | '.*.html' | '.*css' | '.*png'), workbox.strategies.cacheFirst());
workbox.routing.registerRoute(new RegExp('/pages/'), workbox.strategies.staleWhileRevalidate());
