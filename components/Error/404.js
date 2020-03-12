import Link from 'next/link';

function Error404() {
  return (
    <>
      <h1>Page not found!</h1>
      <Link href="/">
        <a>
          <p>{'<- Go HOME'}</p>
        </a>
      </Link>
    </>
  );
}

export default Error404;
