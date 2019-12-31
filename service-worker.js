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
	workbox.strategies.staleWhileRevalidate({
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [ 200 ]
			}),
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 30
			})
		]
	})
);
workbox.routing.registerRoute(new RegExp('.*.js' | '.*.html' | '.*css' | '.*png'), workbox.strategies.cacheFirst());
workbox.routing.registerRoute(new RegExp('/pages/'), workbox.strategies.staleWhileRevalidate());

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.cacheFirst({
		cacheName: 'images',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60 // 30 hari
			})
		]
	})
);
// Add Push Notification
self.addEventListener('push', function(event) {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push Message no payload';
	}

	let option = {
		body: body,
		icon: './icon.png',
		vibrate: [ 100, 50, 100 ],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(self.registration.showNotification('Push Notification', option));
});
