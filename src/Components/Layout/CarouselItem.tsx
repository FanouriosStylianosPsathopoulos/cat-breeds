import React from "react";
import EyeButton from "../common/EyeButton";
import { useModal } from "../../context/ModalContext";
import ModalContent from "../Features/MainPage/ModalContent";

interface CarouselItemProps {
  item: any; 
}

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  const { openModal } = useModal();

  return (
    <div className="relative  grow gap-2 flex-col flex items-center p-4 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-lg shadow-lg">
      <h3 className="text-l font-semibold">{item.name || "Loading..."}</h3>
      
      <div className = 'flex-grow'>
        <img
          src={item?.url}
          alt="Fetched from API"
          className="rounded w-full h-[150px] bg-black object-contain"
        />
      </div>
      
    <EyeButton onClick={() => {
      openModal( <ModalContent item ={item}/>)
    }} />
    </div>
  );
};

export default CarouselItem;
