import { Category } from "@/model/Category";

export function getCategoryColor(category: string | Category) {
    switch(category) {
        case Category.GENERAL:
            return 'yellow';
        case Category.STUDY:
            return 'blue';
        case Category.PROJECT:
            return 'red';
        default:
            return '';
    }
}