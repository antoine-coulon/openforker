import createAuth0Client from '@auth0/auth0-spa-js';

const AUTH0ֹֹֹֹֹ_DOMAIN = 'dev-0ps-73wq.eu.auth0.com';
const AUTH0_CLIENT_ID = 'pyHn4FFpiusYwbqZx1XmvfPZwQ26Wr4t';

const configureClient = async () => {
  const auth0 = await createAuth0Client({
    domain: AUTH0ֹֹֹֹֹ_DOMAIN,
    client_id: AUTH0_CLIENT_ID,
    redirect_uri: 'http://localhost:4243/callback',
    connection: 'github',
  });
  return auth0;
};

window.onload = async () => {
  await configureClient();
  window.location.replace('https://github.com/login/oauth/authorize?client_id=b21103718c308abe6916&allow_signup=true&state=sdf532q4sdf65qsdfqs5df4qsd&scope=repo');
};
