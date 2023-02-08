# Status
Production(brunch: prod): [![Netlify Status](https://api.netlify.com/api/v1/badges/b3cf4f3c-0e67-455b-9a61-54e1f01b50dd/deploy-status)](https://app.netlify.com/sites/football-manager-prod/deploys)

Staging(brunch: dev): [![Netlify Status](https://api.netlify.com/api/v1/badges/89ca9dfc-1b35-4053-92ca-58b3fee6d8bf/deploy-status)](https://app.netlify.com/sites/football-manager-dev/deploys)

# Install
```
yarn
```

# Run
```
yarn dev
```

# CI/CD (deploy)
1. i am using http://netlify.com here,
2. login there
3. there are two website:
football-manager-prod for "prod" brunch
football-manager-dev for "dev" bruch

Where "prod" brunch is a production(https://app.netlify.com/sites/football-manager-prod)
"dev" brunch is a staging(https://app.netlify.com/sites/football-manager-dev).

for deploy, you need just make a commit in according brunch and make a push in repository,
and after deploying will be automatically in fit website was mentioned above in(CI/CD).

statuses about deploy, you can notice at the very top, or at the site http://netlify.com after login there.

# Info
1. teams were taken from: https://www.whoscored.com
2. skills from and info about players: https://www.fmscout.com/club/arsenal.html

# Engine
1. engine: https://github.com/GallagherAiden/footballSimulationEngine
2. ui v1: https://github.com/GallagherAiden/footballsimulationexample
3. ui v2: https://github.com/GallagherAiden/worldcup2018simulator