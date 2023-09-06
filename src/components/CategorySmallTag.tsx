import { $Enums } from "@prisma/client";
import { getCategoryColor } from "@/util/color";

type Props = {
    category: $Enums.Category;
};

export default function CategorySmallTag({ category }: Props) {
    return <span className="tag" data-color={getCategoryColor(category)}>
        {`${category}`}
    </span>;
}