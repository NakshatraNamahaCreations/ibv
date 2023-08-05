import { NotificationManager } from "react-notifications";

export default function createNotification(type, msg, timeout = 3000) {
  return () => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "info":
        NotificationManager.info(msg, timeout);
        console.log("info");
        break;
      case "success":
        NotificationManager.success(msg, "success", timeout);
        break;
      case "warning":
        NotificationManager.warning(msg, "warning", timeout);
        break;
      case "error":
        NotificationManager.error(msg, "Click me!", timeout, () => {
          alert("callback");
        });
        break;
    }
  };
}
