function Content({ title, children }) {
  return (
    <>
      <h2 className="layout-title bordered">{title}</h2>
      {children}
    </>
  );
}

export default Content;
