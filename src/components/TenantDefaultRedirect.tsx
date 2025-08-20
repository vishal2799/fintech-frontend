import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { usePortal } from "../context/PortalContext";
import { useNavigate } from "react-router";
import { getPathByRole } from "../utils/common";

export const TenantDefaultRedirect = () => {
  const { tenantId } = usePortal();
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tenantId) return;

    if (!accessToken || !user) {
      // Not logged in → go to login
      navigate(`/login`, { replace: true });
      return;
    }

    // Logged in → go to role-based dashboard
    const rolePath = getPathByRole(user.staticRole || "");
    navigate(`/${rolePath}`, { replace: true });
  }, [tenantId, user, accessToken, navigate]);

  return null; // nothing to render
};
