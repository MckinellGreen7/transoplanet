import React, { useState } from 'react';
import axios from 'axios';
import Card from './components/Card';

function DomainNameForm() {
  const [domainName, setDomainName] = useState('');
  const [productsData, setProductsData] = useState([]);

  const handleInputChange = (e) => {
    setDomainName(e.target.value);
  };

  const handleSubmit = async () => {
    await getData(domainName);
  };

  const getData = async (url) => {
    try {
      const response = await axios.post('https://transoplanet-ihvh.onrender.com/getProducts', { url });
      setProductsData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className='text-xl font-semibold py-4'>Scrape five products from any shopify store.</div>
      <div className="flex flex-col w-[40%] mb-6">
        <label className="block mb-1 ml-1 text-md font-medium text-gray-900">Domain Name</label>
        <input
          type="text"
          value={domainName}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder="Enter Domain Name"
        />
        <div className="flex items-center justify-center mt-2">
          <button
            onClick={handleSubmit}
            type="button"
            className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%]">
        {productsData.map((product, index) => (
          <Card
            key={index}
            productName={product.imageTitle}
            productImage={product.imageLoc}
            productData={product.details}
          />
        ))}
      </div>
    </div>
  );
}

export default DomainNameForm;
