import Link from 'next/link';

const basicError = ({ message }) => {
  return (
    <div>
      <p>{message.message}</p>
      <p>
        Click
        {' '}
        <Link href="/api/auth/login">
          <a>Here</a>
        </Link>
        to resync your Spotify account.
      </p>
    </div>
  );
};

export default basicError;
