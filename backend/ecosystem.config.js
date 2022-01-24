module.exports = {
  apps: [{
    name: 'Slack-Clone',
    script: 'npm run dev',
    watch: '.',
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy: {
    production: {
      ref: 'origin/master',
      repo: 'https://github.com/TechnoPvP/Svelte-Slack-Clone.git',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    }
  }
};
