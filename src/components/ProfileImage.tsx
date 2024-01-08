'use client'

import Image from "next/image";

export default function ProfileImage() {
    return (
        <Image priority className='profile-img-main' src='/images/site/profile.svg' fill alt='profile image' />
    )
}