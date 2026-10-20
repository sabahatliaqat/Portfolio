
import React, { useEffect, useState } from 'react';
import { GraduationCap, Loader } from 'lucide-react';
import { getEducation } from '../services/api';

const formatDate = (value) => {
    if (!value) return 'Present';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    });
};

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getEducation()
            .then((data) => {
                setEducation(Array.isArray(data) ? data : data.items || []);
            })
            .catch((err) => {
                console.error('Education error:', err);
                setError('Unable to load education details.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="education" className="py-20 px-6 bg-dark">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <GraduationCap className="text-primary" size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Education
                    </h2>
                </div>

                {loading && (
                    <div className="flex justify-center py-10 text-primary">
                        <Loader className="animate-spin" size={36} />
                    </div>
                )}

                {!loading && error && (
                    <p className="text-red-400">{error}</p>
                )}

                {!loading && !error && education.length === 0 && (
                    <p className="text-gray-400">
                        No education details available yet.
                    </p>
                )}

                {!loading && !error && education.length > 0 && (
                    <div className="space-y-6">
                        {education.map((item) => (
                            <article
                                key={item.id}
                                className="bg-card border border-gray-800 rounded-2xl p-6 md:p-8"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    {item.degree}
                                    {item.field_of_study
                                        ? ` in ${item.field_of_study}`
                                        : ''}
                                </h3>

                                <p className="text-primary mt-2">
                                    {item.institution}
                                </p>

                                <p className="text-gray-400 text-sm mt-3">
                                    {item.start_date
                                        ? formatDate(item.start_date)
                                        : ''}
                                    {item.start_date ? ' – ' : ''}
                                    {item.end_date
                                        ? formatDate(item.end_date)
                                        : item.start_date
                                            ? 'Present'
                                            : ''}
                                </p>

                                {item.cgpa && (
                                    <p className="text-gray-300 mt-3">
                                        CGPA: {item.cgpa}
                                    </p>
                                )}

                                {item.description && (
                                    <p className="text-gray-400 mt-4 leading-relaxed whitespace-pre-line">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;
