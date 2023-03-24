type ContainerType = {
  children: any;
  className?: string;
};
export const Container = ({ children, className }: ContainerType) => {
  return <div className={className}>{children}</div>;
};
console.log('Артём, тут не могу избавиться от any, помоги плз');
