module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  devServer: {
    watchOptions: {
      poll: true,
    },
  },

  pwa: {
    name: 'JournalMd App',
    themeColor: '#4caf50',
    msTileColor: '#000000',
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
