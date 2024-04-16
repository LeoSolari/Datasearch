const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 mb-4 text-sm border rounded-md focus:outline-none focus:border-blue-500"
    />
  );
};

export default Input;
