const data = [
  {
    id: 1,
    name: "ETH",
    value: 16871,
    image: "eth.png",
  },
  {
    id: 6,
    name: "USDC",
    value: 28229603.0,
    image: "usdc.png",
  },
  {
    id: 2,
    name: "stETH",
    value: 14597.34,
    image: "steth.png",
  },

  {
    id: 3,
    name: "Nouns",
    value: 847,
    image: "nouns.png",
  },
  {
    id: 4,
    name: "Lil Nouns",
    value: 525699.2790701818,
    image: "lil-nouns.png",
  },
  {
    id: 5,
    name: "rETH",
    value: 308.11,
    image: "rocket-eth.png",
  },
];

export const TreasuryView: React.FC = () => {
  return (
    <div className="w-full">
      <div className=" flex flex-wrap gap-2   mx-auto ">
        {data.map((item) => {
          return (
            <div className="p-4 min-w-[250px]  flex-1 border flex  bg-surface-lowered">
              <div className="flex items-end">
                <img
                  src={"/images/treasury/" + item.image}
                  alt=""
                  className="icon-xl mr-2"
                />
                <div className="text-2xl font-semibold mr-2">
                  {item.value.toLocaleString()}
                </div>
                <div className="text-lg text-text-weaker whitespace-nowrap w-full">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
