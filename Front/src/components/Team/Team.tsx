'use client';

import React, { useState } from "react";
import * as team from "../../Helpers/devTeam.json";
import Image from "next/image";

const Team = () => {
    const teamMembers = team.teamMembers;
    const [visibleSkills, setVisibleSkills] = useState<string | null>(null);

    const toggleSkills = (name: string) => {
        setVisibleSkills(visibleSkills === name ? null : name);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meet the Team</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Meet the brilliant minds behind our project. Each member brings a unique skill set and passion to make this a success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
                {teamMembers.map((member) => (
                    <div key={member.name} className="bg-white shadow-lg text-black rounded-lg p-6 flex flex-col items-center">
                        <Image
                            className="w-24 h-24 rounded-full object-cover mb-4"
                            width={200} height={200}
                            src={member.image_url} 
                            alt={`${member.name} photo`}
                        />
                        <h3 
                            className="text-xl font-semibold text-gray-800"
                        >
                            {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <p className="text-center text-gray-600 mt-2">{member.bio}</p>
                        <h4 className="font-semibold text-gray-800 cursor-pointer mt-4"
                        onClick={() => toggleSkills(member.name)} >Skills:</h4>
                        {visibleSkills === member.name && (
                            <div className="mt-4 text-center">
                                <ul className="list-disc list-inside text-gray-600">
                                    {member.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-4 flex space-x-4">
                            <a
                                href={member.contact.github} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-600"
                            >
                                <Image src="/assets/icon/github.png" alt="GitHub" width={20} height={20} className="w-6 h-6" />
                            </a>
                            <a
                                href={member.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <Image src="/assets/icon/linkedin.png" width={20} height={20} alt="LinkedIn" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
