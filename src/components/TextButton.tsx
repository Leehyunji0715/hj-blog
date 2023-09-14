'use client';

type Props = {
    text: string;
    onClick?: () => void;
    size?: 'normal' | 'small' 
}

export default function TextButton({ text, size='normal', onClick }: Props) {
    return <button className={`btn btn--text ${size === 'small' && 'btn--sm'}`} onClick={onClick}>
        {text}
    </button>
}