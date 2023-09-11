const data = [
  {
    id: 1,
    name: "ETH",
    value: 100,
    image: "eth.png",
  },
  {
    id: 2,
    name: "stETH",
    value: 100,
    image: "steth.png",
  },

  {
    id: 3,
    name: "Nouns",
    value: 100,
    image: "nouns.png",
  },
  {
    id: 4,
    name: "Lil Nouns",
    value: 100,
    image: "lil-nouns.png",
  },
  {
    id: 5,
    name: "Rocket Eth",
    value: 100,
    image: "rocket-eth.png",
  },
];

export const TreasuryView: React.FC = () => {
  return (
    <div className="w-full">
      <div className=" flex flex-wrap gap-2   mx-auto">
        {data.map((item) => {
          return (
            <div className="p-4 min-w-min">
              <div className="flex items-center">
                <img
                  src={"/images/treasury/" + item.image}
                  alt=""
                  className="icon-xl mr-2"
                />
                <div className="text-lg font-semibold mr-2">{item.value}</div>
                <div className="text-lg font-semibold">{item.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
