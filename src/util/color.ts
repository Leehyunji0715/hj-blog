import { $Enums } from "@prisma/client";

export function getCategoryColor(category: string | $Enums.Category) {
    switch(category) {
        case $Enums.Category.GENERAL:
            return 'yellow';
        case $Enums.Category.STUDY:
            return 'blue';
        case $Enums.Category.PROJECT:
            return 'red';
        default:
            return null;
    }
}