import React from 'react';

interface ContextProps {
  updateParent: boolean;
  setUpdateParent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleContext = React.createContext<ContextProps>({
  updateParent: false,
  setUpdateParent: () => {},
});

export default ArticleContext;
