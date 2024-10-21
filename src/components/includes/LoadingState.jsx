import Image from "next/image"

export default function LoadingState() {
    return (
        <>
            <div className="col-xl-12 tw-flex tw-items-center tw-justify-center tw-min-h-[350px] text-secondary tw-flex-col">
                <Image src="http://cdn.vnoc.com/loader/Preloader_3.gif" 
                 width={150}
                 height={150}
                 alt=""
                />
            </div>
        </>
    )
}