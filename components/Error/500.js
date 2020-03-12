import Link from 'next/link';

function Error500() {
  return (
    <>
      <h1>Something went wrong, try again later.</h1>
      <Link href="/">
        <a>
          <p>{'<- Go HOME'}</p>
        </a>
      </Link>
    </>
  );
}

export default Error500;
