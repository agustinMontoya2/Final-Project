"use client"
import { useState } from 'react';
import Image from 'next/image';
import { ProfileImageProps } from '@/interfaces/productoInterface';

const ProfileImage: React.FC<ProfileImageProps> = ({ user, isEditing, onImageChange }) => {
    const [imagePreview, setImagePreview] = useState(user?.user_img || "/assets/icon/profileblack.png");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                onImageChange(file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                {imagePreview ? (
                    <Image src={imagePreview} width={100} height={100} alt="profile" className="m-auto rounded-full" />
                ) : (
                    <Image src="/assets/icon/profileblack.png" width={100} height={100} alt="profile" className="m-auto" />
                )}
                
                {isEditing && (
                    <label htmlFor="file-upload" className="absolute right-0 bottom-0 cursor-pointer">
                        <Image src="/assets/icon/pencil.png" width={20} height={20} alt="Edit" />
                    </label>
                )}
                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default ProfileImage;
