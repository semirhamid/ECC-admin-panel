"use client";
import React, { useState } from "react";
import Image from "next/image";

const hardware = [
  {
    title: "Easee Grenseveien 19 4313, Sandnes, Rogaland, Norway",
    email: "support@easee.com",
    phone: "020 3994 6725",
    website: "https://easee.com/uk/user-support/",
  },
  {
    title:
      "Shell Recharge Shell EV Charging Solutions UK Ltd. - 10 York Road London, SE1 7ND, London",
    email: "customerservice@shellrecharge.com",
    phone: "0203 868 1036",
  },
  {
    title:
      "Ratio EV Charging, Unit 1 Target Park, Shawbank Road, Lakeside Redditch Worcestershire B98 8YN",
    email: "info@ratioev.uk",

    phone: "+44 (0) 1572 396 900",
    website: "https://ratioev.uk",
  },
  {
    title:
      "Project EV Unit 1 Lakes Court, Lancaster Business Park, Burton upon Trent, DE13 9PD",
    email: "enquiries@projectev.co.uk",

    phone: "0800 599 9582",
    website: "https://support.projectev.co.uk/hc/en-gb",
  },
  {
    title:
      "ABB 3100 Daresbury Park,Gr floor, 1stfloor West and EastWA4 4BT Warrington Cheshire",
    email: "GB-contact.centre@abb.com",

    phone: "+44 808 258 2000",
  },
];

const software = [
  {
    title: "Monta App",
    email: "support@monta.app",
    website: "https://monta.com/uk/support/",
  },
  {
    title: "Fuuse App",
    email: "TBC",
    website: "TBC",
  },
];

const installation = [
  {
    title: "Electric Car Chargers UK Ltd, 128 City Road, London EC1V 2NX",
    email: "support@ecc-uk.co.uk",
    website: "0208 895 6511",
  },
];

function Help() {
  const [tab, setTab] = useState(1);

  return (
    <div className="flex flex-col  ">
      <div className="w-full text-4xl font-medium text-black leading-[68px] max-md:max-w-full">
        Helpful information
      </div>
      <div className="flex gap-2.5 self-start mt-10 whitespace-nowrap leading-[104%]">
        <div
          onClick={() => setTab(1)}
          className={`cursor-pointer grow justify-center px-3.5 py-3 text-base ${tab == 1 ? "text-white  bg-[#69BE94]" : "text-black bg-white border border-green-50 border-solid"} rounded-3xl max-md:pr-5`}
        >
          Troubleshooting{" "}
        </div>
        <div
          onClick={() => setTab(2)}
          className={`cursor-pointer grow justify-center py-3 pr-8 pl-4 text-base ${tab == 2 ? "text-white  bg-[#69BE94]" : " text-black bg-white  border border-green-50 border-solid"}  rounded-3xl max-md:pr-5`}
        >
          Contact Details
        </div>
      </div>
      {tab === 1 && (
        <div className="mt-7 w-full text-[16px] leading-5 leading-4 text-[#979797] max-md:max-w-full">
          Please follow the below steps before contacting the relevant
          manufacturer or software company:
          <br />
          <br />
          <span className="font-bold text-black">
            Charging point not working
          </span>{" "}
          <span className="font-semibold text-black">
            - Charge point has lights, but is not activating a charge
          </span>
          <br />
          <br />
          Please try one or both of the following:
          <br />- Reboot the charging point from the app or portal
          <br />- Hard reset the charging point from the power supply (circuit
          breaker)
          <br />
          <br />
          Please allow 2 to 3 minutes for the charging point to re-establish a
          connection after rebooting or
          <br />
          resetting, before trying to charge a vehicle.
          <br />
          <br />
          If still unsuccessful, please either contact the management software
          provider via the 24/7 contact
          <br />
          support which can be found on the management software app. If your
          charger is not operated by
          <br />
          management software (such as Monta or Fuuse), you will need to speak
          to the manufacturer. See
          <br />
          useful contact details.
          <br />
          <br />
          <br />
          <span className="font-semibold text-black">
            Charging point not working - Charge point has no lights
          </span>
          <br />
          <br />
          Please try check the circuit breaker that is supplying the charger. If
          the circuit breaker is in the “off”
          <br />
          position, please switch this to the “on” position.
          <br />
          <br />
          Please allow 2 to 3 minutes for the charging point to re-establish
          connection after rebooting or
          <br />
          resetting before trying the charge the vehicle.
          <br />
          <br />
          If the charger still has no lights with the circuit breaker in the
          “on” position, please contact ECC in
          <br />
          the first instance. See useful contact details.
          <br />
          <br />
          <span className="font-semibold text-black">
            Connector is stuck in the charger
          </span>
          <br />
          <br />
          Please make sure the vehicles charging session is terminated as this
          will not allow the charging
          <br />
          connector to be released.
          <br />
          <br />
          If you have an Easee charge point, there is a manual release button in
          the centre of the charger
          <br />
          (above the LED lights). Push the connector upwards, and then hold the
          button for 15 seconds.
          <br />
          <br />
          You will hear the locking device release, and this will allow you to
          remove your cable.
          <br />
          If this is unsuccessful, or you have a different charging unit, please
          check on the app, or in the
          <br />
          software to make sure the charger hasn’t been set with “enable cable
          lock”. In this instance, you
          <br />
          will need to adjust this in the settings to “unlock”.
          <br />
          <br />
          If the locking feature is set to “off” but you are still unable to
          remove the charger, please try one or
          <br />
          both of the following:
          <br />- Reboot the charging point from the app or portal
          <br />- Hard reset the charging point from the power supply (circuit
          breaker)
          <br />
          <br />
          Please allow 2 to 3 minutes for the charging point to re-establish
          connection after rebooting or
          <br />
          resetting before trying to remove the connector from socket.
          <br />
          If still unsuccessful, or the problem persists, please contact the
          manufacturer who will remotely
          <br />
          assess and help to resolve the issue. See useful contact details.
        </div>
      )}
      {tab == 2 && (
        <>
          <div className="grid  grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 max-w-screen-xl mt-10">
            {hardware.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex overflow-hidden relative flex-col px-6 pt-11 pb-4 text-[14px] font-medium min-w-[370px] max-w-[370px] min-h-[228px] border border-[#69BE94] border-solid  rounded-3xl"
                >
                  <div className="relative text-base font-bold leading-4 text-[#69BE94]  min-h-[48px]">
                    {detail.title}
                  </div>

                  {detail.email && (
                    <div className="flex relative gap-3.5 mt-7  whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/emailAddress.svg"
                        className=""
                      />
                      <div className="flex-auto my-auto">{detail.email}</div>
                    </div>
                  )}
                  {detail.phone && (
                    <div className="flex relative gap-3.5 mt-2">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/phone.svg"
                        className=""
                      />
                      <div className="flex-auto my-auto">{detail.phone}</div>
                    </div>
                  )}
                  {detail.website && (
                    <div className="flex relative gap-3.5 mt-2 whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/website.svg"
                        className=""
                      />
                      <div className="grow my-auto">{detail.website}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid   gap-10 max-w-screen-xl mt-10">
            <h2 className="font-bold text-base">Software</h2>

            {software.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex overflow-hidden relative flex-col px-6 pt-11 pb-4 text-[14px] font-medium min-w-[370px] max-w-[370px] min-h-[208px] border border-[#69BE94] border-solid  rounded-3xl"
                >
                  <div className="relative text-base font-bold leading-4 text-[#69BE94]  min-h-[28px]">
                    {detail.title}
                  </div>

                  {detail.email && (
                    <div className="flex relative gap-3.5 mt-7  whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/emailAddress.svg"
                        className=""
                      />
                      <div className="flex-auto my-auto">{detail.email}</div>
                    </div>
                  )}

                  {detail.website && (
                    <div className="flex relative gap-3.5 mt-2 whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/website.svg"
                        className=""
                      />
                      <div className="grow my-auto">{detail.website}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="grid gap-10 max-w-screen-xl mt-10">
            <h2 className="font-bold text-base">Installation</h2>

            {installation.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="flex overflow-hidden relative flex-col px-6 pt-11 pb-4 text-[14px] font-medium min-w-[370px] max-w-[370px] min-h-[208px] border border-[#69BE94] border-solid  rounded-3xl"
                >
                  <div className="relative text-base font-bold leading-4 text-[#69BE94]  min-h-[28px]">
                    {detail.title}
                  </div>

                  {detail.email && (
                    <div className="flex relative gap-3.5 mt-7  whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/emailAddress.svg"
                        className=""
                      />
                      <div className="flex-auto my-auto">{detail.email}</div>
                    </div>
                  )}

                  {detail.website && (
                    <div className="flex relative gap-3.5 mt-2 whitespace-nowrap">
                      <Image
                        loading="lazy"
                        alt="abc"
                        src="/website.svg"
                        className=""
                      />
                      <div className="grow my-auto">{detail.website}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Help;
