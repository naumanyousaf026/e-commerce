import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const JazzCashForm = () => {
  const [formData, setFormData] = useState({
    pp_MerchantID: 'YOUR_MERCHANT_ID',
    pp_Password: 't90zyeba19',
    pp_MSISDN: '',
    pp_RequestID: '',
    pp_ReturnURL: 'http://127.0.01:3000/jazzresponse',
    pp_SecureHash: '',
    integritySalt: 'YOUR_INTEGRITY_SALT',
    hashValuesString: '',
  });

  useEffect(() => {
    getDynamicValues();
  }, []);

  const getDynamicValues = () => {
    const requestID = 'ReqId' + Math.floor(Math.random() * 100000000000);
    setFormData((prevData) => ({
      ...prevData,
      pp_RequestID: requestID,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CalculateHash = () => {
    let hashString = '';
    const { integritySalt, pp_MerchantID, pp_MSISDN, pp_Password, pp_RequestID, pp_ReturnURL } = formData;

    hashString += integritySalt + '&';
    if (pp_MerchantID) hashString += pp_MerchantID + '&';
    if (pp_MSISDN) hashString += pp_MSISDN + '&';
    if (pp_Password) hashString += pp_Password + '&';
    if (pp_RequestID) hashString += pp_RequestID + '&';
    if (pp_ReturnURL) hashString += pp_ReturnURL + '&';

    hashString = hashString.slice(0, -1); // Remove the last "&"

    // Update the hashValuesString and generate the SecureHash
    setFormData((prevData) => ({
      ...prevData,
      hashValuesString: hashString,
      pp_SecureHash: CryptoJS.HmacSHA256(hashString, integritySalt).toString(),
    }));
  };

  const submitForm = () => {
    CalculateHash();
    console.log('Hash values string: ', formData.hashValuesString);
    console.log('Secure Hash: ', formData.pp_SecureHash);
    // Submit the form using your method (e.g., form submission, API call, etc.)
    // Since this is a POST request, you may need to implement it based on your API integration.
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-8">
      <div className="w-full max-w-2xl p-8 border border-red-400 rounded-md shadow-md">
        <h3 className="text-center text-2xl text-red-600 mb-6">JazzCash HTTP POST Recurring (Page Redirection) Testing</h3>
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Integrity Salt:</label>
            <input
              type="password"
              name="integritySalt"
              value={formData.integritySalt}
              placeholder="Enter Integrity Salt"
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Merchant ID:</label>
            <input
              type="text"
              name="pp_MerchantID"
              value={formData.pp_MerchantID}
              placeholder="Enter Merchant ID"
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="pp_Password"
              value={formData.pp_Password}
              placeholder="Enter Password"
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Wallet No (MSISDN):</label>
            <input
              type="text"
              name="pp_MSISDN"
              value={formData.pp_MSISDN}
              placeholder="Enter Mobile Wallet No"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Request ID:</label>
            <input
              type="text"
              name="pp_RequestID"
              value={formData.pp_RequestID}
              placeholder="Request ID"
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Return URL:</label>
            <input
              type="text"
              name="pp_ReturnURL"
              value={formData.pp_ReturnURL}
              placeholder="Enter Return URL"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Secure Hash:</label>
            <input
              type="text"
              name="pp_SecureHash"
              value={formData.pp_SecureHash}
              placeholder="Secure Hash"
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>

          <button
            type="button"
            onClick={submitForm}
            className="w-full p-3 bg-red-600 text-white font-semibold text-lg rounded-md hover:bg-red-700"
          >
            Submit
          </button>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Hash Values String:</label>
            <input
              type="text"
              value={formData.hashValuesString}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-700"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JazzCashForm;
