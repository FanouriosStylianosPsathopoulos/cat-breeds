import React, { useState } from 'react';

const selectedProperties = ["adaptability",
    "affection_level",
    "child_friendly",
    "dog_friendly",
    "energy_level"
];

const ModalContent: React.FC = ({item}) => {

    const [metricOption,setMetricOption] = useState('imperial');

    return (
    <>
    <div className="flex justify-center">
        <img src={item?.url} alt={item.breed} className="w-full h-48 object-contain rounded-md " />
    </div>

    <h2 className="text-2xl font-semibold text-center mt-4">{item.breed}</h2>
    <p className="text-sm text-gray-700 mt-2 dark:text-slate-400">{item.description}</p>

    <div className="mt-4 space-y-2">
        <p><strong>Weight:</strong> {metricOption === 'imperial' ? item.weight.imperial :item.weight.metric }</p>
        <p><strong>Life Span:</strong> {item.life_span}</p>
        <p><strong>Country of Origin:</strong> {item.origin}</p>
        <p><strong>Temperament:</strong> {item.temperament}</p>
    </div>

    <div className="mt-4">
        <h3 className="text-xl font-medium">Rankings</h3>
        <ul className="list-disc pl-6 space-y-1 mt-2">
            {
                Object.entries(item)
                .filter(([key]) => selectedProperties.includes(key))
                .map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                        <span>{key}</span>
                        <span>{value}</span>
                    </li>
                ))
            }
        </ul>
    </div>
    </>
    );
};

export default ModalContent;