const PrimaryButton = (props) => {
  return (
    <button
      type={props.type}
      className={`bg-[#7289da] hover:bg-[#677bc4] text-white font-bold w-full mt-3 uppercase py-2 px-4 rounded-sm ${
        props.className
      } ${
        props.disabled ? 'opacity-50 cursor-not-allowed hover:bg-[#7289da]' : ''
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default PrimaryButton;
