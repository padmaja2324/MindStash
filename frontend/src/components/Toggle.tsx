import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
interface ToggleProps {
  text: string;
  onclick:(value:boolean)=>void;
}

async function sharingdenied() {
  await axios.post(
    `${BACKEND_URL}/api/v1/brain/share`,
    {
      share: false,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );
  alert('Sharing has been disabled to renable sharing click on Share button');
}
export function ToggleSwitch({ text,onclick }: ToggleProps) {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(true);
    onclick(true);
    sharingdenied();
    setTimeout(() => {
      setChecked(false);
    }, 1000);
  };

  return (
    <div className="p-2 ">
      <label className="flex items-center justify-between cursor-pointer p-1 bg-gray-200 rounded-full">
        <span className="ml-2 text-gray-700 p-2">{text}</span>
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleClick}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-400 rounded-full shadow-inner peer-checked:bg-indigo-400 transition-colors duration-200 ease-in-out" />
          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
        </div>
      </label>
    </div>
  );
}
