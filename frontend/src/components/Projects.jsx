import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import VideoModal from './VideoModel';
import {
    FolderGit2,
    ExternalLink,
    PlayCircle,
    Loader,
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const Projects = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const data = await getProjects();

                const projectList = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.items)
                        ? data.items
                        : Array.isArray(data?.projects)
                            ? data.projects
                            : [];

                const validProjects = projectList.filter((project) => {
                    const title = project?.title?.trim();

                    return (
                        title &&
                        title.toLowerCase() !== 'string' &&
                        project.description?.trim().toLowerCase() !== 'string'
                    );
                });

                if (isMounted) {
                    setProjects(validProjects);
                    setError('');
                }
            } catch (err) {
                console.error(
                    'Failed to load projects:',
                    err.response?.data || err.message || err
                );

                if (isMounted) {
                    setError(
                        'Failed to load projects. Please check the backend connection and refresh the page.'
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section id="projects" className="py-20 px-6 bg-dark">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <FolderGit2 className="text-primary" size={32} />

                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Featured Case Studies
                    </h2>
                </div>

                {loading && (
                    <div className="flex justify-center py-10 text-primary">
                        <Loader className="animate-spin" size={40} />
                    </div>
                )}

                {!loading && error && (
                    <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <p className="text-gray-400">
                        No projects available yet.
                    </p>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className="bg-card border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors duration-300 group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    {project.is_featured && (
                                        <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full font-medium">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {project.description && (
                                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(Array.isArray(project.tech_stack)
                                        ? project.tech_stack
                                        : []
                                    )
                                        .filter(
                                            (tech) =>
                                                typeof tech === 'string' &&
                                                tech.trim() &&
                                                tech.trim().toLowerCase() !== 'string'
                                        )
                                        .map((tech, index) => (
                                            <span
                                                key={`${project.id}-${tech}-${index}`}
                                                className="bg-dark text-gray-300 text-xs px-3 py-1.5 rounded-md border border-gray-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                </div>

                                {project.case_study &&
                                    project.case_study.trim().toLowerCase() !== 'string' && (
                                        <div className="bg-dark/50 rounded-xl p-4 border border-gray-800/50 mb-8 flex-grow">
                                            <h4 className="text-sm font-semibold text-gray-200 mb-2">
                                                Case Study Insight:
                                            </h4>

                                            <p className="text-gray-400 text-sm whitespace-pre-line leading-relaxed">
                                                {project.case_study}
                                            </p>
                                        </div>
                                    )}

                                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 border-t border-gray-800">
                                    {project.github_url &&
                                        project.github_url !== 'string' && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                                            >
                                                <FiGithub size={18} />
                                                Code
                                            </a>
                                        )}

                                    {project.demo_video_url &&
                                        project.demo_video_url !== 'string' && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedVideo({
                                                        url: project.demo_video_url,
                                                        title: project.title,
                                                    })
                                                }
                                                className="text-gray-400 hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
                                            >
                                                <PlayCircle size={18} />
                                                Watch Demo
                                            </button>
                                        )}

                                    {project.live_url &&
                                        project.live_url !== 'string' && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-emerald-400 flex items-center gap-2 text-sm font-medium transition-colors"
                                            >
                                                <ExternalLink size={18} />
                                                Live App
                                            </a>
                                        )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo?.url}
                    title={selectedVideo?.title}
                />
            </div>
        </section>
    );
};

export default Projects;