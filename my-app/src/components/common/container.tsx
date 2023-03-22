type ContinerType = {
  children: any;
  className?: string;
};
console.log('Привет Артём, помоги протипизировать данный елемент');
export const Container = (props: ContinerType) => {
  return <div className={props.className}>{props.children}</div>;
};
