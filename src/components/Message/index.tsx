import "./Message.css";

interface Props {
  msg: string;
  type: string;
}

const Message = ({ msg, type }: Props) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
