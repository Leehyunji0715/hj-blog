import CategoryChipList from "@/components/CategoryChipList";

type Props = {
    children: React.ReactNode;
}

export default async function BlogLayout({children}: Props) {
    return (
        <>
            <CategoryChipList/>
            {children}
        </>
    );
}