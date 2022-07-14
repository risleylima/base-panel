importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
workbox.googleAnalytics.initialize();
importScripts('./ngsw-worker.js');