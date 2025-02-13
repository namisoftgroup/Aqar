// import { useEffect, useState, useMemo } from "react";
// import { useCookies } from "react-cookie";
// import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import axiosInstance from "../../utils/axios";
// import { setUser } from "../../redux/slices/userSlice";
// import useGetProfile from "../profile/useGetProfile";
// export default function useAuth() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [isAuthed, setIsAuthed] = useState(false);
//   const [cookies, , removeCookie] = useCookies(["token", "id"]);
//   const { token, id } = cookies;

//   const { decodedToken, isExpired } = useMemo(() => {
//     if (!token) return { decodedToken: null, isExpired: true };
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       const expired = decoded.exp < currentTime;
//       console.log(currentTime, expired);

//       return { decodedToken: decoded, isExpired: expired };
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return { decodedToken: null, isExpired: true };
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) {
//       axiosInstance.defaults.headers.common[
//         "Authorization"
//       ] = `bearer ${token}`;
//     }
//   }, [token]);

//   const { profile, isFetched, refetch } = useGetProfile(
//     Boolean(token && !isExpired)
//   );

//   useEffect(() => {
//     if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
//       dispatch(setUser({}));
//       removeCookie("token");
//       removeCookie("id");
//       setLoading(false);
//       setIsAuthed(false);
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         if (isFetched) {
//           if (profile) {
//             dispatch(setUser(profile));
//             setIsAuthed(true);
//           } else {
//             console.log("Profile data not available, refetching...");
//             await refetch();
//           }
//         } else {
//           await refetch();
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setIsAuthed(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [
//     decodedToken?.sub,
//     dispatch,
//     id,
//     isExpired,
//     isFetched,
//     profile,
//     refetch,
//     removeCookie,
//   ]);

//   return { loading, isAuthed };
// }

import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../redux/slices/userSlice";
import useGetProfile from "../profile/useGetProfile";

export default function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const removeCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  };

  const token = getCookie("token");
  const id = getCookie("id");

  const { decodedToken, isExpired } = useMemo(() => {
    if (!token) return { decodedToken: null, isExpired: true };
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expired = decoded.exp < currentTime;
      console.log(currentTime, expired);

      return { decodedToken: decoded, isExpired: expired };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { decodedToken: null, isExpired: true };
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `bearer ${token}`;
    }
  }, [token]);

  const { profile, isFetched, refetch } = useGetProfile(
    Boolean(token && !isExpired)
  );

  useEffect(() => {
    if (isExpired || Number(decodedToken?.sub) !== Number(id)) {
      dispatch(setUser({}));
      removeCookie("token");
      removeCookie("id");
      setLoading(false);
      setIsAuthed(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isFetched) {
          if (profile) {
            dispatch(setUser(profile));
            setIsAuthed(true);
          } else {
            console.log("Profile data not available, refetching...");
            await refetch();
          }
        } else {
          await refetch();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [decodedToken?.sub, dispatch, id, isExpired, isFetched, profile, refetch]);

  return { loading, isAuthed };
}
