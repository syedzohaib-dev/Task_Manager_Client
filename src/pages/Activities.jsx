import React, { useState } from "react";

const Activities = () => {
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        status: "",
        description: "",
    });

    const [activities, setActivities] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.status || !formData.description.trim()) return setError('Fill out this field');

        setActivities([...activities, formData]);
        setFormData({ status: "", description: "" }); // Reset
        setError('')
    };

    return (
        <div className="w-full bg-gray-100 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT SIDE – Activities List */}
                <div className="md:col-span-2 h-[500px] overflow-auto hide-scrollbar bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Activities</h2>

                    <div className="relative pl-6">


                        {activities.length > 0 && (
                            <div className="absolute top-0 left-2 w-1 bg-gray-300 h-full rounded"></div>
                        )}

                        {activities.map((item, index) => (
                            <div key={index} className="mb-6 relative">

                                <div className="absolute -left-5 top-2 w-4 h-4 bg-blue-800 rounded-full border-2 border-white"></div>

                                <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-wrap">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold"> <b> Status:</b> </span>{item.status}
                                    </p>
                                    <p className="mt-2 wrap-break-word">{item.description}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* RIGHT SIDE – Form */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Add Activity</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="space-y-2">
                            {["Started", "Completed", "In Progress", "Commented", "Bug", "Assigned"].map((label) => (
                                <label key={label} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={label}
                                        checked={formData.status === label}
                                        onChange={(e) =>
                                            setFormData({ ...formData, status: e.target.value })
                                        }
                                    />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>

                        <textarea
                            placeholder="Write details here..."
                            className="w-full p-3 border border-gray-300 hover:border-blue-800 rounded-lg outline-none"
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        ></textarea>
                        <div className="h-6 text-sm text-red-600 w-full">
                            {error}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Activities;
