import Link from 'next/link';

export default {
  401: () => {
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
  },
  404: () => {
    return (
      <>
        <h1>Page not found!</h1>
        <Link prefetch href="/">
          <a>
            <p>{'<- Go HOME'}</p>
          </a>
        </Link>
      </>
    );
  }
};
