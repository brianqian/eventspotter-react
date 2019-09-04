import Link from 'next/link';

function Error401() {
  return (
    <>
      <h1>User Account Error!</h1>
      <p>
        Click{' '}
        <Link
          href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectURI}`}
        >
          <a>here</a>
        </Link>{' '}
        to try logging in again!
      </p>
      <Link prefetch href="/">
        <a>
          <p>{'<- Go HOME'}</p>
        </a>
      </Link>
    </>
  );
}

export default Error401;
