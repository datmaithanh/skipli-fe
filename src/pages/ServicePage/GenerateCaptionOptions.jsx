import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelectedOption } from '../../context/statecontext/SelectedOptionContext';

const GenerateCaptionOptions = () => {
    const { setSelectedOptionSocial } = useSelectedOption();
    const navigate = useNavigate()
    const handleOptionClick = ( optionSocial) => {
        setSelectedOptionSocial(optionSocial);
        navigate("/generate-caption/socialnetworkpost");
    };
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Generate unique captions from scratch
      </h1>
      <p className="text-gray-600 mb-6">
        Choose the type of post you want a caption for, and let Skipli AI write it for you
      </p>
      <p className="text-gray-800 font-medium mb-6">
        What kind of post do you want a caption for?
      </p>

      <div className="space-y-4">
        {/* Facebook */}
        <div className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition" onClick={() => handleOptionClick('Facebook')}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black mr-4">
            <FaFacebookF size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Facebook post</h3>
            <p className="text-sm text-gray-500">Generate caption for a post</p>
          </div>
        </div>

        {/* Instagram */}
        <div className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition" onClick={() => handleOptionClick('Instagram')}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black mr-4">
            <FaInstagram size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Instagram post</h3>
            <p className="text-sm text-gray-500">Generate caption for a post</p>
          </div>
        </div>

        {/* Twitter */}
        <div className="flex items-center border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition" onClick={() => handleOptionClick('Twitter')}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black mr-4">
            <FaTwitter size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Twitter post</h3>
            <p className="text-sm text-gray-500">Generate caption for a post</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCaptionOptions;
