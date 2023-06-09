import { useEffect, useState } from 'react';

import type { ICategory } from '@/interfaces';
import { getAllCategories } from '@/services';

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    getAllCategories()
      .then(setCategories);
  }, []);
  
  return {
    categories
  };
};
