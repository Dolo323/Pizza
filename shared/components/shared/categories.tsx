'use client';

import { cn } from "../../lib/utils";
import React from "react";
import { useCategoryStore } from "../../store/category";
import { Category } from "@prisma/client";

interface Props {
    items: Category[];
    className?: string;
}


export const Categories: React.FC<Props> = ({items, className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
    const setActiveId = useCategoryStore((state) => state.setActiveId);

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {items.map(({name, id}) => (
                <a 
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeId === id && 'bg-white shadow=md shadow-gray-200 text-primary',
                    )}   
                    href={`/#${name}`}
                    key={id}
                    onClick={() => setActiveId(id)}
                >
                    <button>
                        {name}  
                    </button>
                </a>
            ))}
        </div>
    );
};
