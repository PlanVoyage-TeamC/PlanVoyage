import Image from "next/image";
import LikeDislike from "../../../public/images/likeDislike.png";

export default function PlaceCard({ image, name, maxprice, minprice }) {
  return (
    <div className="min-w-[350px] h-[260px] flex flex-col shadow-lg rounded-2xl ">
      <Image
        src={image}
        alt={name}
        width={350}
        height={250}
        className="h-[200px] w-full object-cover rounded-t-2xl"
      />
      <div className="bg-[#ffffff80] text-black rounded-b-2xl flex justify-between px-4 py-2">
        <div>
          <h3 className="text-[15px] font-bold">{name}</h3>
          <p className="text-base">${minprice} - ${maxprice}</p>
        </div>

        <div className="flex gap-3 items-center justify-end pb-2">
          <Image
            src={LikeDislike}
            alt="Like"
            width={30}
            height={30}
            className="cursor-pointer"
          />
          <Image
            src={LikeDislike}
            alt="Dislike"
            width={30}
            height={30}
            className="cursor-pointer rotate-180"
          />
        </div>
      </div>
    </div>
  );
}
