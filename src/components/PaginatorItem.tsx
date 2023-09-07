type Props = {
    item: number | React.ReactNode;
    isSelected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};

export default function PaginatorItem({ item, isSelected, disabled, onClick }: Props) {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={`pagination-item ${isSelected && 'pagination-item--selected'}`}
        >
            {item}
        </button>
    )
} 