import React, { useEffect, useState } from 'react';
import Carousel from '../../Layout/Carousel';
import Search from '../../common/Search';
import { getData } from '../../../axios/methods';

export interface Breed {
  id: string;
  name: string;
  description: string;
  [key: string]: any; 
}

const HomePage: React.FC = () => {

  const [searchTerm,setSearchTerm] =useState('');

  const [breeds, setBreeds] = useState<Breed[]>([]);

  const [carouselItems,setCarouselItems] = useState<Breed[]>([]);

  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const loadBreeds = async () => {
        try {
          const breedsData = await getData<Breed[]>('/breeds');

          setBreeds(breedsData);
          
          setCarouselItems(breedsData);
        } catch (error) {
            console.log('error');
        }
        finally{
          setLoading(false);
        }
      };
      
    loadBreeds();
  }, []);

  return (
    !loading ?
        <>
            <Search breeds ={breeds} setResults={setCarouselItems} setSearchTerm={setSearchTerm} />
            <Carousel items={carouselItems} searchTerm = {searchTerm}/> 
        </>
        : null 
  );
};

export default HomePage;