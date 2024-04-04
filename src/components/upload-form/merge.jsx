import React, { useState } from 'react';
import SuccessConfirmation from "./success-message/SuccessConfirmation";

function MergeUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [responseID, setResponseID] = useState('');

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]); // Update to handle multiple files
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedFiles.length) {
            alert("Please select at least one file.");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        fetch('http://localhost:8080/merge', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
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
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Files</label>
                        <input type="file" name="files" id="files" className="sr-only" onChange={handleFileChange} multiple />
                        <label htmlFor="files" className="relative flex min-h-[150px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                            <div>
                                {selectedFiles.length > 0 ? (
                                    <span className="block text-xl font-semibold text-[#07074D]">Files selected: {selectedFiles.length}</span>
                                ) : (
                                    <>
                                        <span className="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here or click to browse</span>
                                        <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</span>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Merge Files</button>
                </form>
            </div>
        </div>
    );
}

export default MergeUpload;