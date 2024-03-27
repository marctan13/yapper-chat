import React from "react";

const emojis = ["😀", "😂", "😊", "😎", "😍", "🤩", "😋", "😜", "😘", "🥳", "👍", "👏"];

function EmojiSelection({ handleEmojiClick }) {
  return (
    <div className="emojiPopup">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className="emojiItem"
          onClick={() => handleEmojiClick(emoji)}
          role="img"
          aria-label="Emoji"
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiSelection;