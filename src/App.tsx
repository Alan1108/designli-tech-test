import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";

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
              // Sin applicationServerKey (clave pública VAPID)
            });
            console.log("Suscripción:", subscription);
            // En un escenario real, NO enviarías esta información sensible al frontend de otra manera
            // sin un backend seguro. Aquí, podrías mostrarla en la consola para pruebas limitadas.
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
