self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Default Title";
  const options = {
    body: data.body || "Default message.",
    icon: data.icon || "/finnhub-logo.webp",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/");
});
