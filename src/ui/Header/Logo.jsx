import { Link } from "react-router";

export default function Logo({ children }) {
  return (
    <Link href="/" className="logo">
      <img src="https://placehold.co/400" alt="Aqar's logo" />
      <span className="logo-text ">{children}</span>
    </Link>
  );
}
