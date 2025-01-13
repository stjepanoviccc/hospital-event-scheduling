import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, useLocation } from "react-router-dom";
import JwtService from "../../services/jwtService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, logout } from "../../store/authSlice";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = JwtService.getAccessToken();

      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            dispatch(setIsLoggedIn(true)); 
          } else {
            dispatch(logout()); 
          }
        } catch (error) {
          console.error("Invalid token:", error);
          dispatch(logout()); 
        }
      } else {
        dispatch(logout());
      }

      setLoading(false);
    };

    checkToken(); 
  }, [dispatch]); 

  if (loading) {
    return <p className="text-primaryColor p-2">Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
