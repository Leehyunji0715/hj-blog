import { Category } from "@/model/Category";
import { getCategoryColor } from "@/util/color";

type Props = {
    category: Category;
};

export default function CategorySmallTag({ category }: Props) {
    return <span className="tag" data-color={getCategoryColor(category)}>
        {`${category}`}
    </span>;
}