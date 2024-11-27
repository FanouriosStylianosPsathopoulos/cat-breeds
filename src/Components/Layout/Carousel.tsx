import React, { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import { getData } from "../../axios/methods";
import { Breed } from "../Features/MainPage/MainPageContainer";


const preloadImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            console.log('loaded');   
            resolve(url);
        }
        img.onerror = () => reject(new Error(`Failed on image preloadd: ${url}`));
    });
interface CarouselProps {
    items: Breed[]; 
    searchTerm: string
}

const Carousel: React.FC<CarouselProps> = ({ items, searchTerm }) => {
    const visibleItemsCount = Math.min(window.innerWidth < 640 ? 2 : 5, items.length); 

    const [currentIndex, setCurrentIndex] = useState(0);
    
    const [loading,setLoading] = useState(true);    
    
    const [catState,setCatState] = useState([]);

    console.log('currentIndex -visibleItemsCount  <= 0',currentIndex -visibleItemsCount  <= 0)

    const fetchAdditionalInfo = async (currentItems: Array<{ id: number; title: string }>) => {
        try {
            const newInfo = await Promise.all(
                currentItems.map(async (item) => {
                    const info = await getData("/images/search/", { breed_ids: item.id });
                    if (info[0]?.url) {
                        await preloadImage(info[0].url);
                    }
                    return { ...item, url: info[0]?.url };
                })
            );
            return newInfo;
        } catch (error) {
            console.error("error", error);
        }
    };

    useEffect(() => {

        let shouldAbort = false;

        const loadData = async () => {
            if (items.length) {
                setLoading(true);

                const visibleItems = items.slice(0, currentIndex + visibleItemsCount);
                const newInfo = await fetchAdditionalInfo(visibleItems);

                if (!shouldAbort) {
                    setCatState(newInfo);
                    setCurrentIndex(0);
                    setLoading(false);
                }
            } else {
                setLoading(true);
            }
        };
        
        loadData();
        return ()=> {
            shouldAbort = true;
        }
    }, [items]); 
    
    const handlePrev = async() => {
        setLoading(true);
        const newIndex = currentIndex - visibleItemsCount;
        setCurrentIndex(newIndex);
        const visibleItems = items.slice(newIndex, currentIndex);
        const newInfo = await fetchAdditionalInfo(visibleItems);
        setCatState(newInfo);
        setLoading(false);
    };

    const handleNext = async () => {
        setLoading(true);
        const newIndex =  currentIndex + visibleItemsCount;
        const endIndex = newIndex + visibleItemsCount  > items.length ? items.length  : newIndex + visibleItemsCount;
        console.log('newIndex',newIndex,endIndex);
        setCurrentIndex(newIndex);
        const visibleItems = items.slice(newIndex, endIndex);
        console.log('visible items',visibleItems,items);
        const newInfo = await fetchAdditionalInfo(visibleItems);
        setCatState(newInfo);
        setLoading(false);
    };

    return (
        items.length ? 
        <div className="relative w-full max-w-6xl mx-auto p-8">
            <div className="flex overflow-hidden">
                {!loading ? catState.map((item) => (
                    <div
                        key={item.id}
                        className="flex-shrink-0 flex items-streched w-full sm:w-1/2 md:w-1/5 p-2"
                    >
                        <CarouselItem
                            item={item}
                        />
                    </div>
                )) : 
                <div className="w-full h-full flex items-center justify-center  p-8">
                <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
                </div>
            </div>
                }
            </div>

            <button
                onClick={async () => await handlePrev()}
                disabled = {loading || currentIndex -visibleItemsCount  < 0 }
                className="absolute top-1/2 left-[-20px] md:left-[-40px] transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    >
                    <path
                        fillRule="evenodd"
                        d="M15.78 3.22a.75.75 0 0 1 0 1.06L9.06 11l6.72 6.72a.75.75 0 1 1-1.06 1.06l-7.25-7.25a.75.75 0 0 1 0-1.06l7.25-7.25a.75.75 0 0 1 1.06 0z"
                        clipRule="evenodd"
                    />
                </svg>

            </button>

            <button
                onClick={async () => await handleNext()}
                disabled = {loading || visibleItemsCount + currentIndex >= items.length}
                className="absolute top-1/2 right-[-20px] md:right-[-40px] transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
               <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path
                    fillRule="evenodd"
                    d="M8.22 3.22a.75.75 0 0 1 1.06 0l7.25 7.25a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L14.94 11 8.22 4.28a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                />
                </svg>

            </button>
        </div> : 
        <div className="flex justify-center p-4">
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div>
            <span className="font-medium">No results with the '{searchTerm}' as search query</span>
            </div>
        </div>
      </div>
    );
};

export default Carousel;
