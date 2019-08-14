import Link from 'next/link';

function Error401() {
  return (
    <>
      <h1>User Account Error!</h1>
      <p>
        Click
        {' '}
        <Link prefetch href="/api/auth/login">
          <a>here</a>
        </Link>
        {' '}
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
