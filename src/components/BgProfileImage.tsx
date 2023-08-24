import Image from "next/image";

export default function BgProfileImage() {
    return (
        <div className="profile">
            <Image 
                src='/sample_profile.png' 
                alt="profile" 
                fill
                className="object-contain"
            />
        </div>
    )
}