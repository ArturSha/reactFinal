type ContainerType = {
  children: React.ReactNode;
  className?: string;
  tabIndex?: number;
};
export const Container = ({ children, className, tabIndex }: ContainerType) => {
  return (
    <div tabIndex={tabIndex} className={className}>
      {children}
    </div>
  );
};
