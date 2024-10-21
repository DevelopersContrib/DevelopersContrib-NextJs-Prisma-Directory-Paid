

const TextLimit = ({ text, limit }) => {
  if (text.length <= limit) {
    return <span>{text}</span>;
  }

  const truncatedText = text.substring(0, limit) + '...';
  return <span title={text}>{truncatedText}</span>;
};

export default TextLimit;