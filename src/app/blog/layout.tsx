import CategoryChipList from "@/components/CategoryChipList";

type Props = {
    children: React.ReactNode;
}

export default function BlogLayout({children}: Props) {
    return (
        <>
            <CategoryChipList/>
            {children}
        </>
    );
}