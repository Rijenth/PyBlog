import { useEffect } from "react";

function useTokenRenewal() {
  useEffect(() => {
    const RENEW_TOKEN_INTERVAL = 14 * 60 * 1000; 
    let timeout: NodeJS.Timeout;

    function scheduleRenewToken() {
      clearTimeout(timeout);
      timeout = setTimeout(renewToken, RENEW_TOKEN_INTERVAL);
    }

    function renewToken() {
      fetch("http://localhost:5000/api/renew-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'), 
        }
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to renew token");
        }
      })
      .then(data => {
        sessionStorage.setItem("token", data.token);
        scheduleRenewToken();
      })
      .catch(error => {
        console.error(error);
        sessionStorage.clear();
        window.location.replace("/");
      });
    }
    scheduleRenewToken();
  }, []
  );
}

export default useTokenRenewal;
