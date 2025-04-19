import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { environment } from "./utils/environment";

export const App = () => {
  useEffect(() => {
    const subscribeForPush = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.ready;

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Permiso de notificación concedido.");
          try {
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: environment.vapidKey,
            });
          } catch (error) {
            console.error("Error al suscribir:", error);
          }
        } else {
          console.log("Permiso de notificación denegado.");
        }
      }
    };
    subscribeForPush();
  }, []);

  return <HomePage />;
};
