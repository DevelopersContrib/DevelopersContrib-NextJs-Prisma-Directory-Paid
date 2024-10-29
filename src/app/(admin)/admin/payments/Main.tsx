import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import DataTableListing from './DataTableListing'
import { PaymentType } from "@/types/payment.type";

type Props = {
  recents: PaymentType[];
};

const Main = ({recents}: Props) => {
  return (
    <div className="p-[50px] flex flex-col gap-y-8 w-full">
      <div>
        <h2 className="font-sans font-semibold text-2xl text-black/60 flex items-center">
          <span className="mr-2">
            <FaRegFileAlt />
          </span>
          {`Payment Transaction`}
        </h2>
      </div>
      <div>
      <DataTableListing recents={recents}/>
      </div>
    </div>
  )
}

export default Main