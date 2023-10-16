import Image from "next/image";
import { ChangeEvent, DragEvent, useCallback, useState } from "react";

type Props = {
    onChangeImage: (image: File) => void;
    disabled?: boolean;
};


export default function ImageDragDrop({ onChangeImage, disabled }: Props) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [file, setFile] = useState<File>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
            onChangeImage(files[0]);
        }
    };

    const handleDrag = (e: DragEvent) => {
        if (e.type === 'dragenter') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);   
        }
    }

    const handleDragOver = useCallback((e: React.DragEvent): void => {
        e.preventDefault();
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer?.files;
        if (files && files[0]) {
            setFile(files[0]);
            onChangeImage(files[0]);
        }
    }, []);

    return (
        <div className="w-100 form-img">
            <input 
                className='d-none'
                id="choose-file"
                type="file" 
                accept="image/*"
                onChange={handleChange}
                disabled={disabled ? true : false}
            />
            <label 
                htmlFor="choose-file" 
                className="form-img--drop"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {disabled && <div className="form-img--disabled">disabled</div>}
                {isDragging && <div className="form-img--dragging"/>}
                {
                    file && <div className='form-img-file'>
                        <Image 
                            src={URL.createObjectURL(file)} 
                            alt='local file' 
                            fill
                            sizes='650px'
                        />
                    </div>
                }
            </label>
        </div>
    )
}