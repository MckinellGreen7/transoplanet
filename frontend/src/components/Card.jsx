import React from 'react';

const Card = ({ productImage, productName, productData }) => {
    const points = productData.split(/(\d+\.\s+)/).filter((item, index) => index % 2 === 1).map((item, index) => {
        return productData.split(/(\d+\.\s+)/).filter((item, index) => index % 2 === 0)[index+1];
      }).filter(item => item !== undefined && item.trim() !== "");
  return (
    <div className='flex items-center justify-center m-2'>
      <div className="flex w-full md:w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100">
        <div className="flex-shrink-0 w-1/3 h-72">
          <img className="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={productImage} alt="image"/>
        </div>
        <div className="flex flex-col px-3 py-2 w-2/3 h-72">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{productName}</h5>
          <ul className="list-disc list-inside">
            {points.map((point, index) => (
              <li key={index} className="mb-1 font-normal text-gray-700">{point.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
