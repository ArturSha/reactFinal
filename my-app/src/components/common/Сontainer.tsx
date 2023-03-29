type ContainerType = {
  children: any;
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
console.log('Артём, тут не могу избавиться от any, помоги плз');
