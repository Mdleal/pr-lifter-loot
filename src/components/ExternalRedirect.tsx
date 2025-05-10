import React, { useEffect } from 'react';

interface ExternalRedirectProps {
  to: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Redirecting...</h1>
        <p className="text-gray-600">
          If you are not redirected automatically, please{' '}
          <a href={to} className="text-sky-600 hover:text-sky-800 font-medium">
            click here
          </a>
          .
        </p>
        <div className="mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ExternalRedirect;
