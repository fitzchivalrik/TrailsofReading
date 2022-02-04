/** @type {import('vite-plugin-pwa').VitePWAOptions} */
const pwaConfiguration = {
  //TODO
  // Too many open file during build, ups
  // includeAssets: [
  //   // 'data/scripts/*/*.json.bin',
  //   // 'data/kklc/*.json.bin',
  //   // 'data/wk/*.json.bin',
  //   // 'data/frequency/*.json.bin',
  //   // 'data/heisig6/*.json.bin',
  // ],
  mode: "development",
  workbox: {
    // Workaround Firefox bug for runtimeCaching (which is gone x) )
    inlineWorkboxRuntime: true,
    runtimeCaching: [
      // {
      //   urlPattern: /^https:\/\/.*\/data\/scripts\/{0-9}{1,2}\/.*\.json\.bin$/i,
      //   handler: 'CacheFirst',
      //   options: {
      //     cacheName: 'script-files',
      //     expiration: {
      //       maxEntries: 3291,
      //       maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
      //     },
      //     cacheableResponse: {
      //       statuses: [0, 200]
      //     },
      //     backgroundSync: {
      //       name: "script-caching",
      //       options: {
      //         maxRetentionTime: 24 * 60
      //       }
      //     }
      //   }
      // },
      {
        urlPattern: /^https:\/\/.*\/data\/kklc\/[0-9]{4}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'kklc-entries',
          expiration: {
            maxEntries: 2302,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          },
          backgroundSync: {
            name: "kklc-caching",
            options: {
              maxRetentionTime: 24 * 60
            }
          }
        }
      },
      {
        urlPattern: /\/data\/frequency\/[0-9]{4}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'frequency-entries',
          expiration: {
            maxEntries: 4583,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/grade\/[0-9]{2}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'grade-entries',
          expiration: {
            maxEntries: 12,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/heisig5\/[0-9]{4}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'heisig5-entries',
          expiration: {
            maxEntries: 3032,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/heisig6\/[0-9]{4}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'heisig6-entries',
          expiration: {
            maxEntries: 3003,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/jlpt\/[0-9]{1}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'jlpt-entries',
          expiration: {
            maxEntries: 7,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/kanken\/[0-9]{2}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'kanken-entries',
          expiration: {
            maxEntries: 12,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/.*\/data\/wk\/[0-9]{2}\.json\.bin$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'wk-entries',
          expiration: {
            maxEntries: 62,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
    ]
  },
  manifest: {
    name: 'Trails of Reading',
    short_name: 'TrailsRead',
    description: 'Reading drills straight outta Zemuria.',
    start_url: './',
    scope: './',
    theme_color: '#3e0909',
    background_color: '#3e0909',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: './android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512'
      },
      {
        src: './android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable'
      }
    ]
  },
};

export { pwaConfiguration };