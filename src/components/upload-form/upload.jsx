import React, { useState } from 'react';
import SuccessConfirmation from "./success-message/SuccessConfirmation";

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPassword, setUserPassword] = useState('');
    const [ownerPassword, setOwnerPassword] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [responseID, setResponseID] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedFile || !userPassword || !ownerPassword) {
            alert("Please select a file and enter both passwords.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userPassword', userPassword);
        formData.append('ownerPassword', ownerPassword);

        fetch('http://localhost:8080/encryptPdf', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse the response as JSON
                } else {
                    throw new Error('Upload failed');
                }
            })
            .then(data => {
                setUploadSuccess(true);
                setResponseID(data.id);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Upload failed: ' + error.message);
                setUploadSuccess(false);
            });
    };

    if (uploadSuccess) {
        return <SuccessConfirmation fileId={responseID} />;
    }

    return (
        <div className="flex items-center justify-center p-5">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form className="py-6 px-9" onSubmit={handleSubmit}>
                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload File</label>
                        <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
                        <label htmlFor="file" className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                            <div>
                                {selectedFile ? (
                                    <span className="block text-xl font-semibold text-[#07074D]">File selected: {selectedFile.name}</span>
                                ) : (
                                    <>
                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here or click to browse</span>
                                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</span>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="userPassword" className="block text-sm font-medium text-[#07074D] mb-2">User Password:</label>
                        <input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ownerPassword" className="block text-sm font-medium text-[#07074D] mb-2">Owner Password:</label>
                        <input
                            type="password"
                            name="ownerPassword"
                            id="ownerPassword"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={ownerPassword}
                            onChange={(e) => setOwnerPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Send File</button>
                </form>
            </div>
        </div>
    );
}

export default FileUpload;