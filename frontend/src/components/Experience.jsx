
import React, { useEffect, useState } from 'react';
import { BriefcaseBusiness, Loader } from 'lucide-react';
import { getExperience } from '../services/api';

const formatDate = (value) => {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    });
};

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getExperience()
            .then((data) => {
                setExperiences(
                    Array.isArray(data) ? data : data.items || []
                );
            })
            .catch((err) => {
                console.error('Experience error:', err);
                setError('Unable to load professional experience.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="experience" className="py-20 px-6 bg-dark">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <BriefcaseBusiness className="text-primary" size={32} />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Professional Experience
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

                {!loading && !error && experiences.length === 0 && (
                    <p className="text-gray-400">
                        No professional experience available yet.
                    </p>
                )}

                {!loading && !error && experiences.length > 0 && (
                    <div className="space-y-6">
                        {experiences.map((item) => (
                            <article
                                key={item.id}
                                className="bg-card border border-gray-800 rounded-2xl p-6 md:p-8"
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    {item.job_title}
                                </h3>

                                <p className="text-primary mt-2">
                                    {item.company}
                                </p>

                                {(item.location || item.employment_type) && (
                                    <p className="text-gray-400 text-sm mt-2">
                                        {[item.location, item.employment_type]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    </p>
                                )}

                                <p className="text-gray-400 text-sm mt-3">
                                    {formatDate(item.start_date)}
                                    {item.start_date ? ' – ' : ''}
                                    {item.is_current
                                        ? 'Present'
                                        : formatDate(item.end_date)}
                                </p>

                                {item.description && (
                                    <p className="text-gray-300 mt-4 leading-relaxed whitespace-pre-line">
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

export default Experience;
