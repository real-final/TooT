const UserBubble = ({text}: {text:string}) => {
  return (<div className="w-fit place-self-end p-[10px] mb-[5px] rounded-lg bg-slate-200">{text}</div>);
};
export default UserBubble;