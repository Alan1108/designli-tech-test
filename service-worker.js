self.addEventListener("push", (event) => {
  console.log("Hello push");
  new Notification("Notificación Local", {
    body: "Esta notificación se originó en el cliente.",
  });
  const data = event.data
    ? event.data.json()
    : { title: "Notificación Push", body: "¡Has recibido un push!" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/public/finnhub-logo.webp",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/");
});
