function errorPage({ code }) {
  console.log('IN GETINTIAL PROPS ERROR', code);
  return (
    <div>
      I'M THE ERROR PAGE
      {code === '401' && <div>Unauthorized User, try logging in again.</div>}
      {code === '404' && <div>Page not found, redirecting?</div>}
    </div>
  );
}

errorPage.getInitialProps = ({ query }) => {
  return { code: query.code };
};

export default errorPage;
