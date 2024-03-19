function Input() {
  return (
    <div className="inputMessage">
    <form className="inputBox">
      <input
        className="textBox"
        placeholder="Type Message here..."
        type="text"
      />
      <button className="send">Send</button>
    </form>
  </div>
  )
}

export default Input
