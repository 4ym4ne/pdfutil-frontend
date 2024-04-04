import React from 'react';

function SuccessConfirmation({ fileId }) {
    const handleDownload = async () => {
        const downloadUrl = `http://localhost:8080/pdfs/${fileId}`;

        try {
            const response = await fetch(downloadUrl, {
                method: 'GET',
                // Include headers if needed, for example, Authorization header
                // headers: {
                //   'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
                // },
            });

            if (!response.ok) {
                throw new Error('Failed to download file.');
            }

            // Assuming the server returns a PDF file
            const blob = await response.blob();
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.setAttribute('download', 'encryptedFile_.pdf');
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Download error:', error);
            alert('An error occurred while downloading the file.');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="rounded-lg bg-gray-50 px-16 py-14">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-200 p-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">Congratulations!!!</h3>
                <p className="text-center font-normal text-gray-600">File encrypted ID: {fileId}</p>
                {fileId && (
                    <button onClick={handleDownload} className="mt-4 block w-full text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Download PDF
                    </button>
                )}
            </div>
        </div>
    );
}

export default SuccessConfirmation;