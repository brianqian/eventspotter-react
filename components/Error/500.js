import Link from 'next/link';

function Error500() {
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

export default Error500;
