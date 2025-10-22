// Redux
import { useSelector } from "react-redux";

const NotificationMessage = () => {
  const message = useSelector((state) => state.notification);
  const text = message ? message.replace("Error:", "") : "";

  return (
    <p className="text-center, mb-10 min-h [1.5rem] font-semibold text-red-600">
      {text || "\u00A0"}
    </p>
  );
};

export default NotificationMessage;
