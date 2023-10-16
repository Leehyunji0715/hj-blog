type Props = {
    text: string;
    className?: string;
}

export default function Button({ text, className }: Props) {
    return <button className={`btn btn--bg ${className ?? ''}`}>
        {text}
    </button>
}