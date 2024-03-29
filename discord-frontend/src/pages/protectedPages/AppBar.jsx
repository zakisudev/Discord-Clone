import ChosenOptionLabel from '../../components/ChosenOptionLabel';
import DropdownMenu from '../../components/DropdownMenu';

const AppBar = () => {
  return (
    <div className="flex items-center justify-between px-[15px] absolute right-0 top-0 h-[48px] border-b border-black w-[calc(100%-296px)] bg-gray-500">
      <div className="flex items-center">
        <ChosenOptionLabel />
      </div>
      <DropdownMenu />
    </div>
  );
};

export default AppBar;
