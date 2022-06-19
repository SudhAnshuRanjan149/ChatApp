const join = ({ setUserName, setRoom, joinRoom }) => {
  return (
    <>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="enter your name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter room id"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </>
  );
};

export default join;
