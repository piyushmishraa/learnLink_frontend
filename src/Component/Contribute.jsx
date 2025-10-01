import React, { useState } from 'react'

function Contribute(props) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

    const categories = [
        "Practice & Coding Challenges",
        "Documentation & References",
        "System Design & Architecture",
        "Tools & Utilities",
        "Quick References & Cheatsheets",
        "Learning Resources & Guides",
        "Collections & Open Source",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(title);
        console.log(url);
        console.log(category);

        try {
            const sendurl = "https://learnlink-backend-0x63.onrender.com/resources"
            const response = await fetch(sendurl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, category, url })
            })
            console.log(response);

            if (!response.ok) {
                throw new Error("API request failed");
            }else {
                alert("Your resource has been submitted and will be reviewed for approval ");
            }

            // Reset form after successful submission
            setTitle('');
            setUrl('');
            setCategory('');

        } catch (error) {
            console.log("something went wrong while posting resource" + error);
        }
    }

    return (
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-2xl border border-white border-opacity-20 p-8 mx-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Contribute Resource
                </h2>
                <button
                    onClick={props.onClick}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                >
                    ×
                </button>
            </div>

            <div className="space-y-5">
                <div>
                    <input
                        type="text"
                        placeholder="Resource title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3  border border-black rounded-lg    transition-all text-gray-700"
                    />
                </div>

                <div>
                    <input
                        type="url"
                        placeholder="Resource URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-700"
                    />
                </div>

                <div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white text-gray-700"
                    >
                        <option value="">Select category</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={props.onClick}
                        className="flex-1 bg-white text-black px-4 py-3 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex-1 bg-black text-white px-4 py-3 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors font-medium"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contribute