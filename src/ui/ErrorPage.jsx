import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();
  console.log(error);

  return (
    <div className="error-container">
      <h1>Something went wrong!</h1>
      <p>{error.status}</p>
      <p>{error.message}</p>
      <button>Go To Home</button>
    </div>
  );
}

export default ErrorPage;
