const Notification = ({ msg, type }) => {
  if (!msg) return null;
  return <div className={`${type}`}>{msg}</div>;
};

export default Notification;
