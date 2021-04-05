import React, { useEffect, useState } from 'react'

interface AppProps {
  children: React.ReactNode,
};

const App = (props: AppProps) => {
  const { children } = props;
  

  return (
    <>
      {children}
    </>
  );
}

export default App;