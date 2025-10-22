// React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const useAuthRedirect = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);
};

export default useAuthRedirect;
