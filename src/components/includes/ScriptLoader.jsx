const ScriptLoader = ({ html }) => {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    );
  };
  
  export default ScriptLoader;