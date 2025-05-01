import { Link, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Something went wrong!</h1>
      <p>{error.status}</p>
      <p>{error.message}</p>
      <Link to={"/"}>Go To Home</Link>
    </div>
  );
}

export default ErrorPage;
