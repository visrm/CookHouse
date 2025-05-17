const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;

  return (
    <>
      <span className={`loading loading-spinner ${sizeClass} z-0`} />
    </>
  );
};
export default LoadingSpinner;
