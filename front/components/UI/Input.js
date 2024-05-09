const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=" px-4 py-2 mb-4 text-sm border bg-gray-800 rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

export default Input;
