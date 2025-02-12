import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useAuth from "../hooks/helper/useAuth";
import { useEffect } from "react";
import { openAuthModal } from "../redux/slices/authModalSlice";
import AuthModal from "../ui/Authentication/AuthModal";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      navigate("/");
      dispatch(openAuthModal());
    }
  }, [dispatch, isAuthed, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthed ? children : null}
      <AuthModal />
    </>
  );
}

export default ProtectionProvider;
