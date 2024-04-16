import { Skeleton } from '@mui/material';

const SkeletonSSLForm = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg max-h-[294px] overflow-hidden">
      <div className="flex justify-between mb-1">
        <div>
          <Skeleton variant="text" width={100} height={30} animation="wave" />
        </div>
        <div>
          <Skeleton variant="circular" animation="pulse" width={40} height={40} />
        </div>
      </div>
      <h2 className="text-[32px] font-semibold">
        <Skeleton variant="text" animation="wave"  width={100} height={40} />
      </h2>
      <div className="">
        <div className="icon flex mr-4">
          <div className="h-10 w-10 flex justify-center items-center">
            <Skeleton variant="circular" animation="pulse" width={35} height={35} />
          </div>
          <div className="ml-2">
            <Skeleton variant="text" animation="wave"   width={250} height={40} />
          </div>
        </div>
        <div className="icon flex mr-4">
         <div className="h-10 w-10 flex justify-center items-center">
            <Skeleton variant="circular" animation="pulse" width={35} height={35} />
          </div>
          <div className="ml-2">
            <Skeleton variant="text" animation="wave"   width={250} height={40} />
          </div>
        </div>
        <div className="icon flex mr-4">
         <div className="h-10 w-10 flex justify-center items-center">
            <Skeleton variant="circular" animation="pulse" width={35} height={35} />
          </div>
          <div className="ml-2">
            <Skeleton variant="text" animation="wave"   width={250} height={40} />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Skeleton variant="circular" animation="pulse" width={60} height={60} />
      </div>
    </div>
  );
};

export default SkeletonSSLForm;
